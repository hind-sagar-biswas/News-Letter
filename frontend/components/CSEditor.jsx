'use client'

import dynamic from 'next/dynamic';

const CSEditor = dynamic(() => import('@/components/Editor'), { ssr: false });

export default CSEditor;
