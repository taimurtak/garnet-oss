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
import projectsEnumerators from 'src/modules/projects/projectsEnumerators';

const schema = yup.object().shape({
  projectName: yupFormSchemas.string(
    i18n('entities.projects.fields.projectName'),
    {
      "required": true
    },
  ),
  projectDescription: yupFormSchemas.string(
    i18n('entities.projects.fields.projectDescription'),
    {},
  ),
  projectTags: yupFormSchemas.stringArray(
    i18n('entities.projects.fields.projectTags'),
    {},
  ),
});

const ProjectsForm = (props) => {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      projectName: record.projectName,
      projectDescription: record.projectDescription,
      projectTags: record.projectTags || [],
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
            name="projectName"
            label={i18n('entities.projects.fields.projectName')}
            placeholder={i18n('entities.projects.placeholders.projectName')}
            //hint={i18n('entities.projects.hints.projectName')}  
            required={true}
            layout={formItemLayout}
            autoFocus
          />
          <TextAreaFormItem
            name="projectDescription"
            label={i18n('entities.projects.fields.projectDescription')}
            placeholder={i18n('entities.projects.placeholders.projectDescription')}  
            required={false}
            layout={formItemLayout}
          />
          <SelectFormItem
            name="projectTags"
            label={i18n('entities.projects.fields.projectTags')}
            hint={i18n('entities.projects.hints.projectTags')}
            options={projectsEnumerators.projectTags.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.projects.enumerators.projectTags.${value}`,
                ),
              }),
            )}
            required={false}
            layout={formItemLayout}
            mode="multiple"
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

export default ProjectsForm;
