import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form, Tag } from 'antd';
import ProjectsViewItem from 'src/view/projects/view/ProjectsViewItem';

const ConfigurationsView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.variableName) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.configurations.fields.variableName')}
        >
          {record.variableName}
        </Form.Item>
      )}

      {Boolean(record.variableValue) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.configurations.fields.variableValue')}
        >
          {record.variableValue}
        </Form.Item>
      )}

      {Boolean(record.scope) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.configurations.fields.scope')}
        >
          {(record.scope || []).map((value) => (
            <Tag color={i18n(
              `entities.configurations.${value}.color`
            )}>
              <div key={value}>
                {i18n(
                  `entities.configurations.enumerators.scope.${value}`,
                )}
              </div>
            </Tag>
          ))}
        </Form.Item>
      )}

      {Boolean(record.projectName) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.configurations.fields.projectName')}
        >
          <Tag color="volcano">
            <ProjectsViewItem value={record.projectName} /></Tag>
        </Form.Item>
      )}

      {Boolean(record.serviceName) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.configurations.fields.serviceName')}
        >
          {record.serviceName}
        </Form.Item>
      )}
    </ViewWrapper>
  );
};

export default ConfigurationsView;
