import React, { Component } from "react";
import { Button, Modal, Form, Input, Table  } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  );
  const EditableFormRow = Form.create()(EditableRow);
const CollectionCreateForm = Form.create()(
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            centered
            title="横幅"
            okText="确定"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <FormItem label="Title">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Please input the title of collection!' }],
                })(
                    <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                )}
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );
  class EditableCell extends React.Component {
    state = {
      editing: false,
    }
  
    componentDidMount() {
      if (this.props.editable) {
        document.addEventListener('click', this.handleClickOutside, true);
      }
    }
  
    componentWillUnmount() {
      if (this.props.editable) {
        document.removeEventListener('click', this.handleClickOutside, true);
      }
    }
  
    toggleEdit = () => {
      const editing = !this.state.editing;
      this.setState({ editing }, () => {
        if (editing) {
          this.input.focus();
        }
      });
    }
  
    handleClickOutside = (e) => {
      const { editing } = this.state;
      if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
        this.save();
      }
    }
  
    save = () => {
      const { record, handleSave } = this.props;
      this.form.validateFields((error, values) => {
        if (error) {
          return;
        }
        this.toggleEdit();
        handleSave({ ...record, ...values });
      });
    }
  
    render() {
      const { editing } = this.state;
      const {
        editable,
        dataIndex,
        title,
        record,
        index,
        handleSave,
        ...restProps
      } = this.props;
      return (
        <td ref={node => (this.cell = node)} {...restProps}>
          {editable ? (
            <EditableContext.Consumer>
              {(form) => {
                this.form = form;
                return (
                  editing ? (
                    <FormItem style={{ margin: 0 }}>
                      {form.getFieldDecorator(dataIndex, {
                        rules: [{
                          required: true,
                          message: `${title} is required.`,
                        }],
                        initialValue: record[dataIndex],
                      })(
                        <Input
                          ref={node => (this.input = node)}
                          onPressEnter={this.save}
                        />
                      )}
                    </FormItem>
                  ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
                );
              }}
            </EditableContext.Consumer>
          ) : restProps.children}
        </td>
      );
    }
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.type === 'Disabled User', // Column configuration not to be checked
      type: record.type,
    }),
  };
class Conference extends Component {
    constructor(){
        super()
        this.columns = [{
            title: '类型',
            dataIndex: 'type',
            render: text => <a href="javascript:;">{text}</a>,
          }, {
            title: '内容',
            dataIndex: 'content',
          }];
        this.state = {
            visible: false,
            dataSource : [{
                key: '0',
                type: '横幅',
                content: 32,
              }, {
                key: '1',
                type: '横幅',
                content: 42,
              }, ],
            count:2,
          };
    }
    
    
      showModal = () => {
        this.setState({ visible: true });

      }
    
      handleCancel = () => {
        this.setState({ visible: false });
      }
    
      handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
    
          console.log('Received values of form: ', values);
          form.resetFields();
          this.setState({ visible: false });
          this.handleAdd(values.title)
        });
      }
    
      saveFormRef = (formRef) => {
        this.formRef = formRef;
      }
      handleAdd = (params) => {
        const { count, dataSource } = this.state;
        const newData = {
          key: count,
          type: `横幅`,
          content: params,
        };
        this.setState({
          dataSource: [...dataSource, newData],
          count: count + 1,
        });
      }
      handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ dataSource: newData });
      }
    render(){
        const { dataSource } = this.state;
        const components = {
          body: {
            row: EditableFormRow,
            cell: EditableCell,
          },
        };
        const columns = this.columns.map((col) => {
          if (!col.editable) {
            return col;
          }
          return {
            ...col,
            onCell: record => ({
              record,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave: this.handleSave,
            }),
          };
        });
        return <div>
             <Button type="primary" onClick={this.showModal}>新增</Button>
             <Button type="primary" onClick={this.showModal()}>修改</Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
          <Table components={components} rowSelection={rowSelection} columns={columns} dataSource={dataSource} />,
        </div>
    }
}
export default Conference
