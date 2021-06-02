import {
  CloseOutlined,
  SaveOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Form } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  formItemLayout,
  tailFormItemLayout,
} from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import configurationsEnumerators from 'src/modules/configurations/configurationsEnumerators';
import ProjectsAutocompleteFormItem from 'src/view/projects/autocomplete/ProjectsAutocompleteFormItem';

const schema = yup.object().shape({
  variableName: yupFormSchemas.string(
    i18n('entities.configurations.fields.variableName'),
    {
      "required": true
    },
  ),
  variableValue: yupFormSchemas.string(
    i18n('entities.configurations.fields.variableValue'),
    {
      "required": true
    },
  ),
  scope: yupFormSchemas.stringArray(
    i18n('entities.configurations.fields.scope'),
    {
      "required": true,
      "options": configurationsEnumerators.scope
    },
  ),
  projectName: yupFormSchemas.relationToOne(
    i18n('entities.configurations.fields.projectName'),
    {
      "required": true
    },
  ),
  serviceName: yupFormSchemas.string(
    i18n('entities.configurations.fields.serviceName'),
    {},
  ),
});

const ConfigurationsForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      variableName: record.variableName,
      variableValue: record.variableValue,
      scope: record.scope || [],
      projectName: record.projectName,
      serviceName: record.serviceName,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues as any,
  });

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  const onSubmit = (values) => {
    props.onSubmit(props?.record?.id, values);
  };

  const { saveLoading } = props;
  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputFormItem
            name="variableName"
            label={i18n('entities.configurations.fields.variableName')}
            placeholder={i18n('entities.configurations.placeholders.variableName')}
            hint={i18n('entities.configurations.hints.variableName')}  
            required={true}
            layout={formItemLayout}
            autoFocus
          />
          <TextAreaFormItem
            name="variableValue"
            label={i18n('entities.configurations.fields.variableValue')}
            placeholder={i18n('entities.configurations.placeholders.variableValue')}
            hint={i18n('entities.configurations.hints.variableValue')}  
            required={true}
            layout={formItemLayout}
          />
          <SelectFormItem
            name="scope"
            label={i18n('entities.configurations.fields.scope')}
            placeholder={i18n('entities.configurations.placeholders.scope')}
            hint={i18n('entities.configurations.hints.scope')}
            options={configurationsEnumerators.scope.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.configurations.enumerators.scope.${value}`,
                ),
              }),
            )}
            required={true}
            layout={formItemLayout}
            mode="multiple"
          />
          <ProjectsAutocompleteFormItem  
            name="projectName"
            label={i18n('entities.configurations.fields.projectName')}
            placeholder={i18n('entities.configurations.placeholders.projectName')}
            hint={i18n('entities.configurations.hints.projectName')}
            required={true}
            layout={formItemLayout}
          />
          <InputFormItem
            name="serviceName"
            label={i18n('entities.configurations.fields.serviceName')}
            placeholder={i18n('entities.configurations.placeholders.serviceName')}
            hint={i18n('entities.configurations.hints.serviceName')}  
            required={false}
            layout={formItemLayout}
          />

          <Form.Item
            className="form-buttons"
            {...tailFormItemLayout}
          >
            <Button
              loading={saveLoading}
              type="primary"
              onClick={form.handleSubmit(onSubmit)}
              icon={<SaveOutlined />}
            >
              {i18n('common.save')}
            </Button>

            <Button
              disabled={saveLoading}
              onClick={onReset}
              icon={<UndoOutlined />}
            >
              {i18n('common.reset')}
            </Button>

            {props.onCancel && (
              <Button
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                icon={<CloseOutlined />}
              >
                {i18n('common.cancel')}
              </Button>
            )}
          </Form.Item>
        </form>
      </FormProvider>
    </FormWrapper>
  );
};

export default ConfigurationsForm;
