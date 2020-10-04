import { checkProps, testStore } from '../../../utils';
import * as actions from '../../redux/actions';
import { Input } from '../Form/Input';
import { Textarea } from '../Form/Textarea';
import { AttachFile } from '../Form/AttachFile';
import { Submit } from '../Form/Submit';

describe('Form component', () => {
  test('Store is updated correctly', () => {
    const expectedState = {
      form: {
        senderName: 'Name 1',
        senderMail: 'test@gmail.com',
        recipicientName: 'Name 2',
        recipicientMail: 'test2@gmail.com',
        subject: 'Heya',
        message: 'Hello world',
        files: [
          { name: 'File 1', size: 1 * 1024 ** 2 },
          { name: 'File 2', size: 2 * 1024 ** 2 },
          { name: 'File 3', size: 3 * 1024 ** 2 },
          { name: 'File 4', size: 4 * 1024 ** 2 }
        ]
      }
    };

    const store = testStore();

    store.dispatch(actions.setSenderNameAction('Name 1'));
    store.dispatch(actions.setSenderEmailAction('test@gmail.com'));
    store.dispatch(actions.setRecipicientNameAction('Name 2'));
    store.dispatch(actions.setRecipicientEmailAction('test2@gmail.com'));
    store.dispatch(actions.setSubjectAction('Heya'));
    store.dispatch(actions.setMessageAction('Hello world'));
    store.dispatch(actions.addFilesAction(
      [
        { name: 'File 1', size: 1 * 1024 ** 2 },
        { name: 'File 2', size: 2 * 1024 ** 2 },
        { name: 'File 3', size: 3 * 1024 ** 2 },
        { name: 'File 4', size: 4 * 1024 ** 2 }
      ]
    ));
    
    const newState = store.getState();
    expect(newState).toEqual(expectedState);
  });

  describe('Input', () => {
    it('Should not throw a warning', () => {
      const propsErr = checkProps(Input, { 
        value: 'test',
        id: 'test',
        type: 'test',
        action: () => console.log('foo'),
        placeholder: 'test'
      });

      expect(propsErr).toBeUndefined();
    })
  })

  describe('Textarea', () => {
    it('Should not throw a warning', () => {
      const propsErr = checkProps(Textarea, { 
        value: 'test',
        id: 'test',
        action: () => console.log('foo'),
        placeholder: 'test'
      });

      expect(propsErr).toBeUndefined();
    })
  })

  describe('Attach Filter', () => {
    it('Should not throw a warning', () => {
      const propsErr = checkProps(AttachFile, { 
        formats : [],
        maxSize : 5,
        maxCount : 5,
        value : '',
        action : _ => console.log('foo')
      });

      expect(propsErr).toBeUndefined();
    })
  })

  describe('Submit', () => {
    it('Should not throw a warning', () => {
      const propsErr = checkProps(Submit, { 
        value : '',
      });

      expect(propsErr).toBeUndefined();
    })
  })
})