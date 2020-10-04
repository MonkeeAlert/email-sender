import { reducer } from '../reducers';
import * as actions from '../actions';
import { checkEmail, setState } from '../../../utils/index';

describe('Reducers', () => {
  let initialState, newState;

  beforeEach( () => {
    initialState = {
      form: {
        senderName: '',
        senderMail: '',
        recipicientName: '',
        recipicientMail: '',
        subject: '',
        message: '',
        files: []
      }
    };
  });

  afterEach( () => {
    newState = null;
  })

  it('Should return initial state', () => {
    newState = reducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  describe('Emails', () => {
    it('Should fail test if emails are same', () => {
      let sender = 'test@email.com',
          recipicient = 'test2@email.com',
          tempState = {
            form: {
              senderName: '',
              senderMail: '',
              recipicientName: '',
              recipicientMail: '',
              subject: '',
              message: '',
              files: []
            }
          };

      newState = setState(initialState, actions.setSenderEmailAction(), sender);
      tempState = setState(initialState, actions.setRecipicientEmailAction(), recipicient);

      expect(newState.form.senderMail).not.toBe(tempState.form.recipicientMail);
    });

    describe('Sender', () => {
      it('Should handle action', () => {
        newState = setState(initialState, actions.setSenderEmailAction(), 'email@test.com');
        expect(newState.form).toEqual({ ...initialState.form, senderMail: 'email@test.com' });
      });
  
      it('Value should be validated', () => {
        newState = setState(initialState, actions.setSenderEmailAction(), 'email@test.com');
        expect(checkEmail(newState.form.senderMail)).toBeTruthy();
      });
    });

    describe('Recipicient', () => {
      it('Should handle action', () => {
        newState = setState(initialState, actions.setRecipicientEmailAction(), 'email@test.com');
        expect(newState.form).toEqual({ ...initialState.form, recipicientMail: 'email@test.com' });
      });
  
      it('Value should be validated', () => {
        newState = setState(initialState, actions.setRecipicientEmailAction(), 'email@test.com');
        expect(checkEmail(newState.form.recipicientMail)).toBeTruthy();
      });
    });
  })

  describe('Sender name', () => {
    it('Should handle action', () => {
      newState = setState(initialState, actions.setSenderNameAction(), 'Sergey' )
      expect(newState.form).toEqual({...initialState.form, senderName: 'Sergey'})
    });

    it('Should not be empty', () => {
      newState = setState(initialState, actions.setSenderNameAction(), 'Sergey' )
      expect(newState.form.senderName.length).toBeGreaterThan(0);
    })

    it('Should not contain numbers', () => {
      newState = setState(initialState, actions.setSenderNameAction(), 'Sergey' )
      expect(newState.form.senderName).not.toMatch(/\d/);
    })
  });

  describe('Recipicient name', () => {
    it('Should handle action', () => {
      newState = setState(initialState, actions.setRecipicientNameAction(), 'Sergey' )
      expect(newState.form).toEqual({...initialState.form, recipicientName: 'Sergey'})
    });

    it('Should not be empty', () => {
      newState = setState(initialState, actions.setRecipicientNameAction(), 'Sergey' )
      expect(newState.form.recipicientName.length).toBeGreaterThan(0);
    })

    it('Should not contain numbers', () => {
      newState = setState(initialState, actions.setSenderNameAction(), 'Sergey' )
      expect(newState.form.recipicientName).not.toMatch(/\d/);
    })
  });

  describe('Subject', () => {
    it('Should handle action', () => {
      newState = setState(initialState, actions.setSubjectAction(), 'Theme' )
      expect(newState.form).toEqual({...initialState.form, subject: 'Theme'})
    });

    it('Should not be empty', () => {
      newState = setState(initialState, actions.setSubjectAction(), 'Theme' )
      expect(newState.form.subject.length).toBeGreaterThan(0);
    })
  });

  describe('Files', () => {
    it('Should handle action', () => {
      newState = setState(initialState, actions.addFilesAction(), [] );
      expect(newState.form).toEqual({...initialState.form, files: [] });
    });

    it('User can upload 5 files at one time', () => {
      newState = setState(initialState, actions.addFilesAction(), [
        { name: 'File 1' },
        { name: 'File 2' },
        { name: 'File 3' },
        { name: 'File 4' },
        { name: 'File 5' }
      ]);
      expect(newState.form.files.length).toBeLessThanOrEqual(5);
    });

    it('File must be up to 5mb', () => {
      newState = setState(initialState, actions.addFilesAction(), [
        { name: 'File 1', size: 1 * 1024 ** 2 },
        { name: 'File 2', size: 2 * 1024 ** 2 },
        { name: 'File 3', size: 3 * 1024 ** 2 },
        { name: 'File 4', size: 4 * 1024 ** 2 },
      ]);

      let error = newState.form.files.filter( f => f.size >= 5 * 1024 ** 2 ).length > 0;
      
      expect(error).toBeFalsy();
    });
  });

  describe('Message', () => {
    it('Should handle action', () => {
      newState = setState(initialState, actions.setMessageAction(), 'test message' )
      expect(newState.form).toEqual({...initialState.form, message: 'test message'})
    });

    it('Should not be empty', () => {
      newState = setState(initialState, actions.setMessageAction(), 'test message' )
      expect(newState.form.message.length).toBeGreaterThan(0);
    })
  })
})