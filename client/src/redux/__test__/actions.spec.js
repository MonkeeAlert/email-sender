import * as actions from '../actions';

describe('Actions', () => {
  it('Should create an action for setSenderNameAction', () => {
    let payload = 'Name';

    const expectedAction = {
      type: actions.setSenderNameAction().type,
      payload
    }

    expect(actions.setSenderNameAction(payload)).toEqual(expectedAction);
  });

  it('Should create an action for setSenderEmailAction', () => {
    let payload = 'test@email.com';

    const expectedAction = {
      type: actions.setSenderEmailAction().type,
      payload
    }

    expect(actions.setSenderEmailAction(payload)).toEqual(expectedAction);
  });

  it('Should create an action for setRecipicientNameAction', () => {
    let payload = 'Name';

    const expectedAction = {
      type: actions.setRecipicientNameAction().type,
      payload
    }

    expect(actions.setRecipicientNameAction(payload)).toEqual(expectedAction);
  });

  it('Should create an action for setRecipicientEmailAction', () => {
    let payload = 'test@email.com';

    const expectedAction = {
      type: actions.setRecipicientEmailAction().type,
      payload
    }

    expect(actions.setRecipicientEmailAction(payload)).toEqual(expectedAction);
  });

  it('Should create an action for setSubjectAction', () => {
    let payload = 'Subject';

    const expectedAction = {
      type: actions.setSubjectAction().type,
      payload
    }

    expect(actions.setSubjectAction(payload)).toEqual(expectedAction);
  });

  it('Should create an action for setMessageAction', () => {
    let payload = 'Message text';

    const expectedAction = {
      type: actions.setMessageAction().type,
      payload
    }

    expect(actions.setMessageAction(payload)).toEqual(expectedAction);
  });
})