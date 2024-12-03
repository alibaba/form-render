import React, { memo, useContext } from 'react';
import NodeContainer from '../../components/NodeContainer';
import { ConfigContext } from '../../models/context';

export default memo((props: any) => {
  const { onClick, type, data } = props;
  const { settingMap, widgets } = useContext(ConfigContext);
  const nodeSetting = settingMap[type] || {};
  const NodeWidget = widgets[nodeSetting?.nodeWidget] || undefined;

  return (
    <NodeContainer
      className="custom-node-code"
      title={data?.title || nodeSetting?.title || '开始'}
      icon={{
        type: nodeSetting?.icon?.type || 'icon-start',
        style: { fontSize: 14, color: '#fff' },
        bgColor: nodeSetting?.icon?.bgColor || '#17B26A',
      }}
      onClick={onClick}
      hideDesc={nodeSetting?.hideDesc || !data?.desc}
      desc={data?.desc}
      NodeWidget={NodeWidget ? <NodeWidget data={data} /> : undefined}
    />
  );
});