import React from 'react';
const AssessmentCard = ({student, assessed, score, setScore}) => {

const handleClick = (e) => {
  e.preventDefault()
    // console.log(student)
    assessed(student)
}

const handleChange = (score) => {
    // console.log(score)
    setScore(score)
}

return(
        <form>
            An assessment Card for {student.name}
            <div onChange={(e) => handleChange(e.target.value)}>
                    <input
                    type="radio"
                    value='true'
                    checked={score === 'true'}
                    // onChange ={() => handleChange(true)}
                    /> True
                    <input
                    type="radio"
                    value= 'false'
                    checked={score === 'false'}
                    // checked={false}

                    // onChange ={() => handleChange(false)}
                    /> False
            </div>
            {/* <div className="radio">
                <label>
                    <input
                    type="radio"
                    value='false'
                    onChange ={() => handleChange(false)}
                    />
                    Not Participating
                </label>
            </div> */}
            <button onClick={(e) => handleClick(e)}>
                Submit
            </button>
        </form>    
    ) 
}

export default AssessmentCard;

{/* <form onSubmit={e => this.aSubmitFunction(e)}>
    form guts
</form>

render() {
    return (
      <form onSubmit={this.formSubmit}>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Male"
              checked={this.state.selectedOption === "Male"}
              onChange={this.onValueChange}
            />
            Male
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Female"
              checked={this.state.selectedOption === "Female"}
              onChange={this.onValueChange}
            />
            Female
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Other"
              checked={this.state.selectedOption === "Other"}
              onChange={this.onValueChange}
            />
            Other
          </label>
        </div>
        <div>
          Selected option is : {this.state.selectedOption}
        </div>
        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>
    );
  } */}