
export const fetchHomework = () => {
  return (dispatch, getState) => {
    const promise = new Promise(function(resolve, reject) {
      dispatch(authGetToken())
      .catch(err => {
        dispatch(errHandler(err))
        reject();
        return;
      })
      .then(token => {
        fetch(restAPI)
        .catch(err => {
          dispatch(errHandler(err));
          reject();
          return;
        })
        .then(res => res.json())
        .then(response => {
          dispatch({
            type : 'SET_HOMEWORK_FOR_AGENDA',
            homework : response
          })
            resolve({type : 'success'})
            return;
        })
        .catch(err => {
          reject();
          return;
        })

      })
      resolve();
    });
return promise;
  }
}
