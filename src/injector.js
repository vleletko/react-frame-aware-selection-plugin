//perform actual injection of the modified plugin version to React Event Registry
module.exports = function(){
  var EventPluginRegistry = require('react-dom').__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.EventPluginRegistry;
  var pluginIdx = EventPluginRegistry.plugins.findIndex(function(it) {
    return it && it.eventTypes.hasOwnProperty('select');
  })
  EventPluginRegistry.plugins[pluginIdx] = require('./ReactFrameAwareSelectEventPlugin');
}
