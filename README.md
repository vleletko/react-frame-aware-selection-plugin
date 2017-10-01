# react-frame-aware-selection-plugin

Modified version of React SelectEventPlugin with fixes related to iframe rendering. 

[![Travis build status](http://img.shields.io/travis/vleletko/react-frame-aware-selection-plugin.svg?style=flat)](https://travis-ci.org/vleletko/react-frame-aware-selection-plugin)
[![Dependency Status](https://david-dm.org/vleletko/react-frame-aware-selection-plugin.svg)](https://david-dm.org/vleletko/react-frame-aware-selection-plugin)
[![devDependency Status](https://david-dm.org/vleletko/react-frame-aware-selection-plugin/dev-status.svg)](https://david-dm.org/vleletko/react-frame-aware-selection-plugin#info=devDependencies)
[![npm version](https://badge.fury.io/js/react-frame-aware-selection-plugin.svg)](https://badge.fury.io/js/react-frame-aware-selection-plugin)

1. [Usage](#usage)
2. [Motivation](#motivation)
3. [How it works](#how-it-works)

## Usage

1. Add npm package

    Latest
    
    `npm install react-frame-aware-selection-plugin@2.0.0 --save `
    
    React >= 15.4 && < 16.0.0

    `npm install react-frame-aware-selection-plugin@1.0.0 --save `
    
    React < 15.4
    
    `npm install react-frame-aware-selection-plugin@0.0.5 --save `

2. In you app entry point:

    ```js
    import React from 'react'
    import ReactDOM from 'react-dom'
    import injector from 'react-frame-aware-selection-plugin'
    injector();
    ```

## Motivation 

Current React version does not support onSelect event if component is embedded to iFrame.
Consider following code: 

```js
import Frame from 'react-frame-component'

const AwesomeFramedComponent = ({ onSelect }) => (
  <Frame>
    <div contentEditable="true" onSelect={onSelect}></div>
  </Frame>
)
```

In such situation `onSelect` callback will not be fired. 
This library will fix this behaviour. 
  
  
### Hot it works
Library will replace `SelectEventPlugin` in `EventPluginRegistry` with fixed version.  
