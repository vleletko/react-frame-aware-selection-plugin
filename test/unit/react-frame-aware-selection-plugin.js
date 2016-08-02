import reactFrameAwareSelectionPlugin from '../../src/react-frame-aware-selection-plugin';

describe('reactFrameAwareSelectionPlugin', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(reactFrameAwareSelectionPlugin, 'greet');
      reactFrameAwareSelectionPlugin.greet();
    });

    it('should have been run once', () => {
      expect(reactFrameAwareSelectionPlugin.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(reactFrameAwareSelectionPlugin.greet).to.have.always.returned('hello');
    });
  });
});
