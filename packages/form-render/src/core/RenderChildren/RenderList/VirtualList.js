/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Core from '../../index';
import { Button, Popconfirm } from 'antd';
import VirtualTable from './VirtualTable';

const VirtualList = ({
  displayList = [],
  dataIndex,
  children,
  deleteItem,
  addItem,
  flatten,
  schema,
  listData,
  changeList,
}) => {
  const { props = {}, itemProps } = schema;

  const dataSource = displayList.map((item, idx) => {
    return { index: idx };
  });

  const columns = children.map(child => {
    const item = flatten[child];
    const schema = (item && item.schema) || {};
    return {
      dataIndex: child,
      title: schema.required ? (
        <>
          <span className="fr-label-required"> *</span>
          <span>{schema.title}</span>
        </>
      ) : (
        schema.title
      ),
      render: (value, record, index) => {
        // Check: record.index 似乎是antd自己会给的，不错哦
        const childIndex = [...dataIndex, record.index];
        return (
          <Core
            hideTitle={true}
            displayType="inline"
            key={index.toString()}
            id={child}
            dataIndex={childIndex}
          />
        );
      },
    };
  });

  if (!props.hideDelete) {
    columns.push({
      title: '操作',
      key: '$action',
      fixed: 'right',
      width: 60,
      render: (value, record, idx) => {
        return (
          <Popconfirm
            title="确定删除?"
            onConfirm={() => deleteItem(idx)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        );
      },
    });
  }

  return (
    <>
      <div className="w-100 mb2 tr">
        {!props.hideAdd && (
          <Button type="primary" size="small" onClick={addItem}>
            新增
          </Button>
        )}
        {Array.isArray(props.buttons)
          ? props.buttons.map((item, idx) => {
              const { callback, text, html } = item;
              let onClick = () => {
                console.log({
                  value: listData,
                  onChange: changeList,
                  schema,
                });
              };
              if (typeof window[callback] === 'function') {
                onClick = () => {
                  window[callback]({
                    value: listData,
                    onChange: changeList,
                    schema,
                  });
                };
              }
              return (
                <Button
                  key={idx.toString()}
                  style={{ marginLeft: 8 }}
                  size="small"
                  onClick={onClick}
                >
                  <span dangerouslySetInnerHTML={{ __html: html || text }} />
                </Button>
              );
            })
          : null}
      </div>
      <VirtualTable
        className='virtual-table'
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: 300, x: '100vw' }}
        options={props}
        onRow={(record) => {
          return {
            onClick: (e) => {
              console.log('点击行：', record)
              // if (typeof window[onRowClickCallback] === 'function') {
              //   (window as any)[onRowClickCallback](record);
              // }
            } // 点击行
          };
        }}
      />
    </>
  );
};

export default VirtualList;
