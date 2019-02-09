
constructor(props) {
    super(props);
    this.state = {
      items: {},
      firebaseItems : this.props.homework,
      refreshing : false,
      selectedDay : null
    };
    this.loadItems.bind(this);

  }

  _onRefresh = () => {
  //set state to refeshing
    this.setState({refreshing: true});
    //fetch the homework
    this.props.retrieveHomework()
    .then(res => {
    //set the state to the fetched result
        this.setState({refreshing: false, firebaseItems : this.props.homework}, () => {
        //load the items into the app's ui
          this.loadItems(this.state.selectedDay);
        });
    })
    .catch(err =>{
    console.log(err)
    })



  }

// load items into app's ui
  loadItems(day) {
    setTimeout(() => {
      for (let i = -7; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime] ) {
          this.state.items[strTime] = [];
        }
        if (this.state.firebaseItems[strTime]) {
          this.state.items[strTime] = this.state.firebaseItems[strTime];
        }
      }
      //console.log(this.state.items);
      let newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems,
        selectedDay : day
      });
    }, 100);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

// get homework from state
function mapStateToProps(state){
  return {
    homework : state.homework
  }
}

// function for fetching homework
function mapDispatchToProps(dispatch) {
  return {
    retrieveHomework : () => dispatch(fetchHomework())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaScreen);
