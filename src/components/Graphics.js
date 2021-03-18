import React from 'react';

class Graphics extends React.Component {

    componentDidMount(){
        this.lineGraphProgression()
    }

    lineGraphProgression = () => {
        return(
                    console.log(this.props.graphInfo)
        )


        // console.log(this.props.graphInfo)
        // let graphData=this.props.graphInfo
        // let dates = []
        // let scores = []
        // let counter = 0


        // return(graphData.map(data => {
        //     counter=(counter+1)
        //     console.log(counter)
        // }))
    }

    render(){
        return(
            <div className="graphics">
                Graphics component
            </div>
        )
    }
}
export default Graphics

