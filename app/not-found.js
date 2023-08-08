'use client';

import React from 'react';
import { Result, Button } from 'antd';
import { useRouter } from 'next/navigation';

const Custom404 = () => {
  const router = useRouter();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          className="bg-black text-white hover:!bg-gray-600"
          type="primary"
          size="large"
          onClick={() => router.push('/')}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default Custom404;
