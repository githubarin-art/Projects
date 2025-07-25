import { useState, useEffect, useRef } from 'react';
import './index.css';

function App() {
  const paragraphRef = useRef(null);
  const winningref=useRef(null);
  const headingRef = useRef(null);
  const [score,setScore]=useState(0);
  const [ques, setQues] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); 

  const questionsAndAnswers = [
    { index: 1, question: "What is the capital of France?", answer: "Paris" },
    { index: 2, question: "What is the largest planet in our solar system?", answer: "Jupiter" },
    { index: 3, question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
    { index: 4, question: "What is the chemical symbol for water?", answer: "H2O" },
    { index: 5, question: "In which year did the Titanic sink?", answer: "1912" },
    { index: 6, question: "What is the smallest country in the world?", answer: "Vatican City" },
    { index: 7, question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
    { index: 8, question: "What is the currency of Japan?", answer: "Yen" },
    { index: 9, question: "Which planet is known as the Red Planet?", answer: "Mars" },
    { index: 10, question: "What is the main ingredient in guacamole?", answer: "Avocado" }
  ];

  const Quesinp = () => {
    if (ques.length === 0) {
      setQues(questionsAndAnswers);
    }
  };

  useEffect(() => {
    Quesinp();
  }, []);

  const handleNextQuestion = () => {
    if (currentIndex < ques.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      updateHeading(currentIndex + 1);
      setUserAnswer(''); 
      setIsEditing(false); 
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
      updateHeading(currentIndex - 1);
      setUserAnswer(''); 
      setIsEditing(false); 
    }
  };

  const ToDisplayAnswer = () => {
    setShowAnswer(true); 
    headingRef.current.textContent = `Answer ${ques[currentIndex].index}`;
    paragraphRef.current.textContent = ques[currentIndex].answer; 
    setUserAnswer(''); 
    setIsEditing(true); 
  };

  const updateHeading = (index) => {
    if (headingRef.current) {
      headingRef.current.textContent = `Question ${ques[index].index}`; 
    }
    if (paragraphRef.current) {
      paragraphRef.current.textContent = ques[index].question;
    }
  };

  const UserInput = (event) => {
    setUserAnswer(event.target.value); 
  };

  const handleChangeSubmit = (event) => {
    event.preventDefault(); 
    if (userAnswer.trim().toLowerCase() === ques[currentIndex].answer.toLowerCase()) {
      alert("You have answered correctly");
      setScore(score+1);
    } else {
      alert(`You have answered incorrectly. the correct answer is ${ques[currentIndex].answer}.`);
      
    }
    
    setIsEditing(false); 
    setShowAnswer(false); 
  };
  if(score==10){
    if(winningref.current){
      winningref.current.textContent="you have won";
    }
  }

return (
   <>
     <div className="Quiz-container w-full flex flex-col items-center p-6 bg-gray-100 min-h-screen">
       <div className="Quiz-header bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
         <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Quiz</h1>
         <div id="question-box" className="space-y-6">
           <div 
           ref={winningref}
           className="question-box h-80 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
             <h1 className="text-xl font-semibold text-gray-800 mb-4">Question & Answer Box</h1>
             {/* Render only the current question */}
             {ques.length > 0 && (
               <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                 <h2 ref={headingRef} className="text-lg font-semibold text-gray-700">
                   Question {ques[currentIndex].index}
                 </h2>
                 <p ref={paragraphRef} className="text-gray-600">
                   {showAnswer ? (
                     isEditing ? (
                       <form onSubmit={handleChangeSubmit}>
                         <input 
                           type="text"
                           value={userAnswer}
                           onChange={UserInput}
                           placeholder="Type your answer"
                           className="w-full p-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                         />
                         <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded ml-2">Submit</button>
                       </form>
                     ) : (
                       ques[currentIndex].answer
                     )
                   ) : (
                     ques[currentIndex].question
                   )}
                 </p>
               </div>
             )}
             <p className='text-xl font-semibold'>Score:{score}</p> 
             {/* Navigation buttons */}
             <div className="flex justify-between mt-4">
               <button 
                 onClick={handlePreviousQuestion} 
                 disabled={currentIndex === 0} 
                 className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
               >
                 Previous Question
               </button>
               <button 
                 onClick={handleNextQuestion} 
                 disabled={currentIndex === ques.length - 1} 
                 className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${currentIndex === ques.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
               >
                 Next Question
               </button>
               <button onClick={ToDisplayAnswer} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 border-none">
                 See Answer!
               </button>
             </div>
           </div>
         </div>
       </div>
     </div>
   </>
 );
}

export default App;
