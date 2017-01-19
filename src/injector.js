//perform actual injection of the modified plugin version to React Event Registry
module.exports = function(){
  var keyOf = require('fbjs/lib/keyOf');
  // reset plugins to allow injection
  require('react-dom/lib/EventPluginRegistry')._resetEventPlugins();


  //extending default order plugin
  var DefaultEventPluginOrder = require('react-dom/lib/DefaultEventPluginOrder');
  DefaultEventPluginOrder.push('ReactFrameAwareSelectEventPlugin');

  var EventPluginHub = require('react-dom/lib/EventPluginHub');
  //injection order
  EventPluginHub.injection.injectEventPluginOrder(DefaultEventPluginOrder);

  //restoring original event chain with modified plugin
  EventPluginHub.injection.injectEventPluginsByName({
    BeforeInputEventPlugin: require('react-dom/lib/BeforeInputEventPlugin'),
    SelectEventPlugin: require('./ReactFrameAwareSelectEventPlugin'),
    ChangeEventPlugin: require('react-dom/lib/ChangeEventPlugin'),
    EnterLeaveEventPlugin: require('react-dom/lib/EnterLeaveEventPlugin'),
    SimpleEventPlugin: require('react-dom/lib/SimpleEventPlugin'),
  });
}
