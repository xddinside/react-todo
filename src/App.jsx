import { useRef, useState } from 'react'
import './App.css'

// extra stuff to add
// add id in todo object, and write the id in front of the todo in TodoCard

// make the DoneButton not go out of the TodoCard if no description is given

// make the input boxes expandable if no space left, only till the edge of the MainCard

// make the AddTodo button crazyy looking purple on MainCard hover


function App() {
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState(null)
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null)
  const [inputCard, setInputCard] = useState(false)
  const [titleHover, setTitleHover] = useState(false)
  const [descHover, setDescHover] = useState(false)

  const [todos, setTodos] = useState([
    
      ])

  return (
    <div>
      <h1 style={{ color: "#A0A0FF" }}>Todos</h1>

      <MainCard inputCard={inputCard} setInputCard={setInputCard} titleHover={titleHover} setTitleHover={setTitleHover} descHover={descHover} setDescHover={setDescHover} todos={todos} setTodos={setTodos} />
      <div>

        {todos.map((todo, index) => {
          if (!todo.completed) {
            const cardHovered = hoveredCardIndex === index
            const buttonHovered = hoveredButtonIndex === index

            return  (
              <div>
                <TodoCard todo={todo} index={index} setHoveredCardIndex={setHoveredCardIndex} setHoveredButtonIndex={setHoveredButtonIndex} cardHovered={cardHovered} buttonHovered={buttonHovered} db={
                  <DoneButton setHoveredButtonIndex={setHoveredButtonIndex} buttonHovered={buttonHovered} cardHovered={cardHovered} index={index} todo={todo} todos={todos} setTodos={setTodos}>
                  </DoneButton>
                } />
              </div>
            )}})}

      </div>
    </div>
  )
}


function MainCard(props) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  return (
    <div className='card' onMouseEnter={() => props.setInputCard(true)} onMouseLeave={() => props.setInputCard(false)}
      style={{ 
        backgroundColor:props.inputCard ? ((props.titleHover || props.descHover) ? "#222222" : "#191827"): "#222222",
        borderColor: props.inputCard ? ((props.titleHover || props.descHover) ? 'transparent':"#826EFF ") : 'transparent',
        boxShadow: props.inputCard ? 
          ((props.titleHover || props.descHover) ? "0 4px 12px rgba(0, 0, 0, 0.6)" : "0 4px 32px #201A5A")
          : "0 4px 12px rgba(0, 0, 0, 0.6)",
        transform: props.inputCard ? "translateY(-4px)" : "translateY(0px)",
      }}>

      <div style={{display: "flex", justifyContent: 'center',}}>
        <InputCard text="Title" name="title" inputCard={props.inputCard} titleHover={props.titleHover} setTitleHover={props.setTitleHover} title={title} setTitle={setTitle} desc={desc} setDesc={setDesc} />
      </div>

      <div style={{display: "flex", justifyContent: 'center',}}>
        <InputCard text="Description" name="desc" inputCard={props.inputCard} descHover={props.descHover} setDescHover={props.setDescHover} title={title} setTitle={setTitle} desc={desc} setDesc={setDesc} />
      </div>
      <div>
        <AddTodoButton inputCard={props.inputCard} title={title} setTitle={setTitle} desc={desc} setDesc={setDesc} todos={props.todos} setTodos={props.setTodos} />
      </div>
    </div>
  )
}


function AddTodoButton(props) {
  const [buttonHovered, setHovered] = useState(false)
  const buttonRef = useRef(null)

  function onMouseDownHandler() {
    if (buttonRef) {
      buttonRef.current.style.backgroundColor = '#222222'
    }
  }

  function onMouseUpHandler() {
    if (buttonRef) {
      buttonRef.current.style.backgroundColor = '#181818'
    }
  }

  function onClickHandler() {
    const todo = {
      title: props.title,
      description: props.desc,
      completed: false
    }

    const newTodos = [...props.todos, todo]
    props.setTodos(newTodos)
  }

  return (
    <div style={{display:'flex', justifyContent:'center', marginTop:'5px'}}>
      <button
        ref={buttonRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        onClick={onClickHandler}
        style={{
          color: buttonHovered? "#A0A0FF":"#D0D0FF",
          // backgroundColor: props.inputCard ? "#2f2f2f" : "#181818",
          backgroundColor: props.inputCard ? (buttonHovered? "#181818":"#222222") : "#181818",
          boxShadow: props.inputCard ? (buttonHovered ? "0px 2px 15px #201A5A" : "0px 4px 5px rgba(0, 0, 0, 0.5)") : 'none',
          transform: props.inputCard ? 
            (buttonHovered ? "translateY( 2px)" : "translateY(-4px)" )
            : "translateY(0px)" 
        }}
      >
        Add Todo
      </button>
    </div>
  )
}


function InputCard(props) {

  if (props.name === "title") {

    function onChangeHandler(event) {
      props.setTitle(event.target.value)
    }

    return (
      <input type="text" placeholder={props.text} value={props.title} onChange={onChangeHandler} onMouseEnter={() => props.setTitleHover(true)} onMouseLeave={() => props.setTitleHover(false)} style={{
        backgroundColor: props.inputCard ? (props.titleHover ? "#181818" : "#2f2f2f") : "#181818",
        transform: props.inputCard ? 
          (props.titleHover ? "translateX(0px) translateY(0px)" : "translateX(-2px) translateY(-2px)") 
          : "translateX(0px) translateY(0px)",
        // boxShadow: props.inputCard ? 
        //   (props.titleHover ? "0px 2px 20px #201A5A" : "0 4px 12px rgba(0, 0, 0, 0.6)") : "none",
      }}/>
    )
  }
  
  if (props.name === "desc") {

    function onChangeHandler(event) {
      props.setDesc(event.target.value)
    }

    return (
      <input type="text" placeholder={props.text} value={props.desc} onChange={onChangeHandler} onMouseEnter={() => props.setDescHover(true)} onMouseLeave={() => props.setDescHover(false)} style={{
        backgroundColor: props.inputCard ? (props.descHover ? "#181818" : "#2f2f2f") : "#181818",
        transform: props.inputCard ? 
          (props.descHover ? "translateX(0px) translateY(0px)" : "translateX(-2px) translateY(-2px)") 
          : "translateX(0px) translateY(0px)",
        // boxShadow: props.inputCard ? 
        //   (props.descHover ? "0px 2px 20px #201A5A" : "0 4px 12px rgba(0, 0, 0, 0.6)") : "none",
      }}/>
    )
  }
}


function DoneButton(props) {
  const buttonRef = useRef(null)

  function onMouseDownHandler() {
    if (buttonRef) {
      buttonRef.current.style.transition = 'background-color 0s'
      buttonRef.current.style.backgroundColor = '#131313'
      buttonRef.current.style.boxShadow = '0px 2px 50px #201A5A'
    }
  }

  function onMouseUpHandler() {
    if (buttonRef) {
      buttonRef.current.style.transition = 'all 0.25s ease'
      buttonRef.current.style.backgroundColor = '#181818'
    }
  }

  function markDone() {
    const newTodo = {
      title: props.todo.title,
      description: props.todo.description,
      completed: true
    }
    let newTodos = [
      ...props.todos,
    ]
    newTodos[props.index] = newTodo
    props.setTodos(newTodos)
  }

  return (
    <button
      ref={buttonRef}
      onMouseEnter={() => props.setHoveredButtonIndex(props.index)}
      onMouseLeave={() => props.setHoveredButtonIndex(null)}
      onClick={markDone}
      onMouseUp={onMouseUpHandler}
      onMouseDown={onMouseDownHandler}
      style={{
        color: props.buttonHovered? "#A0A0FF":"#D0D0FF",
        backgroundColor: props.cardHovered ? (props.buttonHovered? "#181818":"#2f2f2f") : "#181818",
        boxShadow: props.cardHovered ? (props.buttonHovered ? "0px 2px 15px #201A5A" : "0px 4px 5px rgba(0, 0, 0, 0.5)") : 'none',
        transform: props.cardHovered ? 
          (props.buttonHovered ? "translateY(38px) translateX(-2px)" : "translateY(36px) translateX(-4px)" )
          : "translateY(40px) translateX(0px)" 
      }}
    >
      Done
    </button>
  )
}


function TodoCard(props) {
  return (
    <div
      key={props.index}
      className='card'
      onMouseEnter={() => props.setHoveredCardIndex(props.index)}
      onMouseLeave={() => props.setHoveredCardIndex(null)}
      style={{
        backgroundColor: props.cardHovered ? (props.buttonHovered ? "#222222": "#1a1a1a" ): "#222222",
        color: props.cardHovered ? (props.buttonHovered ? "#D0D0FF" : "#A0A0FF" ): "#D0D0FF",
        borderColor: props.cardHovered ? (props.buttonHovered ? 'transparent':"#826EFF ") : 'transparent',
        boxShadow: props.cardHovered ? 
          (props.buttonHovered ? "0 4px 12px rgba(0, 0, 0, 0.6)" : "0 4px 12px #201A5A") 
          : "0 4px 12px rgba(0, 0, 0, 0.6)",
        transform: props.cardHovered ? "translateY(-4px)" : "translateY(0px)",
      }} 
    >
      <div className='title'>
        {props.todo.title}
        {props.db}
      </div>
      <div className='desc'>{props.todo.description}</div>
    </div>
  )
}


export default App

