case 'SET_HOMEWORK_FOR_AGENDA':


    let homeworks = {};
    Object.keys(action.homework).forEach(key => {

      var work = {
        data : {
          type : action.homework[key].type,
          className : action.homework[key].class,
          date : action.homework[key].date,
        }
      }

      var dateKey = new Date(action.homework[key].date).toISOString().split("T")[0];

      if (dateKey in homeworks) {
        homeworks[dateKey].push(work);
      } else {
        homeworks[dateKey] = [];
        homeworks[dateKey].push(work);
      }

    })

    return {
      ...state,
      homework : homeworks
    }
