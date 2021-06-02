import {
  SearchOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/configurations/list/configurationsListActions';
import selectors from 'src/modules/configurations/list/configurationsListSelectors';
import FilterWrapper, {
  filterItemLayout,
} from 'src/view/shared/styles/FilterWrapper';
import * as yup from 'yup';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import { Collapse } from 'antd';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import configurationsEnumerators from 'src/modules/configurations/configurationsEnumerators';
import ProjectsAutocompleteFormItem from 'src/view/projects/autocomplete/ProjectsAutocompleteFormItem';

const schema = yup.object().shape({
  variableName: yupFilterSchemas.string(
    i18n('entities.configurations.fields.variableName'),
  ),
  variableValue: yupFilterSchemas.string(
    i18n('entities.configurations.fields.variableValue'),
  ),
  scope: yupFilterSchemas.stringArray(
    i18n('entities.configurations.fields.scope'),
  ),
  projectName: yupFilterSchemas.relationToOne(
    i18n('entities.configurations.fields.projectName'),
  ),
  serviceName: yupFilterSchemas.string(
    i18n('entities.configurations.fields.serviceName'),
  ),
});

const emptyValues = {
  variableName: null,
  variableValue: null,
  scope: [],
  projectName: null,
  serviceName: null,
}

const previewRenders = {
  variableName: {
    label: i18n('entities.configurations.fields.variableName'),
    render: filterRenders.generic(),
  },
  scope: {
    label: i18n('entities.configurations.fields.scope'),
    render: filterRenders.enumeratorMultiple('entities.configurations.enumerators.scope',),
  },
  projectName: {
      label: i18n('entities.configurations.fields.projectName'),
      render: filterRenders.relationToOne(),
    },
  serviceName: {
    label: i18n('entities.configurations.fields.serviceName'),
    render: filterRenders.generic(),
  },
}

const ConfigurationsListFilter = (props) => {
  const dispatch = useDispatch();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'all',
  });

  useEffect(() => {
    dispatch(actions.doFetch(schema.cast(initialValues), rawFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues));
    setExpanded(false);
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    return form.handleSubmit(onSubmit)();
  };

  const { loading } = props;
  return (
    <FilterWrapper>
      <Collapse
        activeKey={expanded ? 'filter' : undefined}
        expandIconPosition="right"
        ghost
        onChange={(value) => {
          setExpanded(Boolean(value.length));
        }}
      >
        <Collapse.Panel
          header={
            <FilterPreview             
              renders={previewRenders}
              values={rawFilter}
              expanded={expanded}
              onRemove={onRemove}
            />
          }
          key="filter"
        >
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Row gutter={24}>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="variableName"
                    label={i18n('entities.configurations.fields.variableName')}      
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  
                  <SelectFormItem
                    name="scope"
                    label={i18n('entities.configurations.fields.scope')}
                    options={configurationsEnumerators.scope.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.configurations.enumerators.scope.${value}`,
                        ),
                      }),
                    )}
                    layout={filterItemLayout}
                    mode="multiple"
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <ProjectsAutocompleteFormItem  
                    name="projectName"
                    label={i18n('entities.configurations.fields.projectName')}        
                    layout={filterItemLayout}
                  />
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <InputFormItem
                    name="serviceName"
                    label={i18n('entities.configurations.fields.serviceName')}      
                    layout={filterItemLayout}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="filter-buttons" span={24}>
                  <Button
                    loading={loading}
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                  >
                    {i18n('common.search')}
                  </Button>
                  <Button
                    loading={loading}
                    onClick={onReset}
                    icon={<UndoOutlined />}
                  >
                    {i18n('common.reset')}
                  </Button>
                </Col>
              </Row>
            </form>
          </FormProvider>
        </Collapse.Panel>
      </Collapse>
    </FilterWrapper>
  );
};

export default ConfigurationsListFilter;