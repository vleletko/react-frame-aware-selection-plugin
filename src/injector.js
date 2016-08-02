//perform actual injection of the modified plugin version to React Event Registry
module.exports = function(){
  var keyOf = require('fbjs/lib/keyOf');
  // reset plugins to allow injection
  require('react/lib/EventPluginRegistry')._resetEventPlugins();


  //extending default order plugin
  var DefaultEventPluginOrder = require('react/lib/DefaultEventPluginOrder');
  DefaultEventPluginOrder.push(keyOf({ReactFrameAwareSelectEventPlugin: null}));

  const EventPluginHub = require('react/lib/EventPluginHub');
  //injection order
  EventPluginHub.injection.injectEventPluginOrder(DefaultEventPluginOrder);

  //restoring original event chain with modified plugin
  EventPluginHub.injection.injectEventPluginsByName({
    'SimpleEventPlugin': require('react/lib/SimpleEventPlugin'),
    'EnterLeaveEventPlugin': require('react/lib/EnterLeaveEventPlugin'),
    'ChangeEventPlugin': require('react/lib/ChangeEventPlugin'),
    'ReactFrameAwareSelectEventPlugin': require('./ReactFrameAwareSelectEventPlugin'),
    'BeforeInputEventPlugin': require('react/lib/BeforeInputEventPlugin'),
  });
}
