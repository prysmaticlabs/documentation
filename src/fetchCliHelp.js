import React from 'react'

export class FetchCLIHelp extends React.Component {
  constructor(props) {
    super(props);
	this._isMounted = false;
    this.state = {
      error: null,
      isLoaded: false,
      items: '',
    };
  }

  componentDidMount() {
    this._isMounted = true;
	fetch(`https://cli.prylabs.network/${this.props.prysmComponent}`)
	  .then(res => res.text())
	  .then(
		(result) => {
			if (this._isMounted) {
			  this.setState({
				isLoaded: true,
				items: result,
			  });
			}
		},
		(error) => {
			console.log('got err', result);
			if (this._isMounted) {
			  this.setState({
				isLoaded: true,
				error,
			  });
			}
		}
	  )
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading parameter list...</div>;
    } else {
      return (
		  <pre>
			  <code>
				  {items}
			  </code>
		  </pre>
      );
    }
  }
}
