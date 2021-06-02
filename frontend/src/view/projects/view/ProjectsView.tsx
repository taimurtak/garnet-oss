import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import ViewWrapper, {
  viewItemLayout,
} from 'src/view/shared/styles/ViewWrapper';
import { i18n } from 'src/i18n';
import { Form, Tag } from 'antd';


const ProjectsView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <ViewWrapper>
      {Boolean(record.projectName) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.projects.fields.projectName')}
        >
          {record.projectName}
        </Form.Item>
      )}

      {Boolean(record.projectDescription) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.projects.fields.projectDescription')}
        >
          {record.projectDescription}
        </Form.Item>
      )}

      {Boolean(record.projectTags) && (
        <Form.Item
          {...viewItemLayout}
          label={i18n('entities.projects.fields.projectTags')}
        >
          {(record.projectTags || []).map((value) => (
            <Tag color="volcano">
              <div key={value}>
                {i18n(
                  `entities.projects.enumerators.projectTags.${value}`,
                )}
              </div>
            </Tag>
          ))}
        </Form.Item>
      )}
    </ViewWrapper>
  );
};

export default ProjectsView;
