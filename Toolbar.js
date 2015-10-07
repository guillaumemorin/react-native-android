var ToolbarAndroid = require('ToolbarAndroid');
var React = require('react-native');

var toolbarActions = [
  {title: 'Create', icon: require('image!header_logo'), show: 'always'},
  {title: 'Filter'},
  {title: 'Settings', icon: require('image!header_logo'), show: 'always'},
];

var styles = {
    height: 56,
    fontSize: 20,
    color: '#ffffff',
    backgroundColor: '#e9eaed'
}

class Toolbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            actionText: 'TEXT'
        };
    }
    _onActionSelected(position) {
        if (position === 0) { // index of 'Settings'
            // showSettings();
        }
    }
    render(){
        return <ToolbarAndroid
                    actions={toolbarActions}
                    onActionSelected={this._onActionSelected}
                    onIconClicked={() => this.setState({actionText: 'Icon clicked'})}
                    style={styles}
                    subtitle={this.state.actionText}
                    title="Toolbar" />
    }
}

module.exports = Toolbar;
