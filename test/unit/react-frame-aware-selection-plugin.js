import React from 'react'
import ReactDOM from 'react-dom'
import injector from '../../src/index'
import Plugin from '../../src/ReactFrameAwareSelectEventPlugin'
import Frame from 'react-frame-component'

const EventPluginRegistry = ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.EventPluginRegistry

const getIFrameDoc = () => document.querySelector('iframe').contentDocument

const iframePromise = () => new Promise(resolve => {
  const nextTick = () => {
    const doc = getIFrameDoc()
    if (doc && doc.readyState === 'complete') {
      resolve(doc)
    } else {
      window.requestAnimationFrame(nextTick)
    }
  }
  nextTick()
})

function triggerMouseEvent (node, eventType, doc = document) {
  var clickEvent = doc.createEvent ('MouseEvents');
  clickEvent.initEvent (eventType, true, true);
  node.dispatchEvent(clickEvent);
}

describe('React Frame Aware SelectEventPlugin', () => {
  describe('injector', () => {
    let parentNode;
    let mounted;

    beforeEach(() => {
      parentNode = document.createElement('div')
      document.body.appendChild(parentNode)
    });

    //
    afterEach(() => {
      ReactDOM.unmountComponentAtNode(parentNode)
      document.body.removeChild(parentNode)
    })

    class Editable extends React.Component {
      render (){
        const {onSelect, id} = this.props
        return (
          <div id={id} suppressContentEditableWarning contentEditable="true" onSelect={onSelect}>some text content</div>
        )
      }
    }

    const Fixture = ({onSelect, id}) => (
      <Frame>
        <Editable id={id} onSelect={onSelect}/>
      </Frame>
    )

    it('should not fail on plain contenteditable', () => {
      const onSelectSpy = stub()

      ReactDOM.render(<Editable onSelect={onSelectSpy} id="unframed"/>, parentNode);

      const element = document.querySelector('#unframed')
      element.focus()
      triggerMouseEvent(element, 'mousedown', document)
      triggerMouseEvent(element, 'mouseup', document)

      return new Promise(resolve => setTimeout(resolve, 50)).then( () => {
        expect(onSelectSpy.callCount).to.eq(1)
      })
    });

     it('should fail on plain contenteditable wrapped by iframe', () => {
       const onSelectSpy = stub()

       ReactDOM.render(<Fixture onSelect={onSelectSpy} id="framed"/>, parentNode);

       return iframePromise().then((doc) => {
         const element = doc.querySelector('#framed')
         element.focus()
         triggerMouseEvent(element, 'mousedown', doc)
         triggerMouseEvent(element, 'mouseup', doc)

         return new Promise(resolve => setTimeout(resolve, 50))
       }).then(() => {
         expect(onSelectSpy.callCount).to.eq(0)
       })
    });

    it('should modify React EventPluginRegistry to contain custom plugin', () => {
      injector();
      expect(EventPluginRegistry.plugins).to.contain(Plugin)
    });

    it('should not fail for framed component after injection', () => {
      const onSelectSpy = stub()

      ReactDOM.render(<Fixture onSelect={onSelectSpy} id="framed"/>, parentNode);

      return iframePromise().then((doc) => {
        const element = doc.querySelector('#framed')
        element.focus()
        triggerMouseEvent(element, 'mousedown', doc)
        triggerMouseEvent(element, 'mouseup', doc)

        return new Promise(resolve => setTimeout(resolve, 50))
      }).then(() => {
        expect(onSelectSpy.callCount).to.eq(1)
      })
    })


  });
});
