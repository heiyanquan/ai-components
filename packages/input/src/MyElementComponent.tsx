import React from 'react'
import { createComponent } from '@lit/react'
import { MyElement } from './my-element'

export const MyElementComponent = createComponent({
  tagName: 'my-element',
  elementClass: MyElement,
  react: React,
  events: {
    onactivate: 'activate',
    onchange: 'change'
  }
})
