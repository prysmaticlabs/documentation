import React from 'react';
import Content from '@theme-original/DocItem/Content';
import { RequestUpdateWidget } from '@site/src/components/RequestUpdateWidget.js';
export default function ContentWrapper(props) {
  return (
    <>
      <Content {...props} />
      <RequestUpdateWidget />
    </>
  );
}