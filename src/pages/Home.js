import { Button, MenuItem, TextField } from '@mui/material';
import './Home.css';
import Categories from '../Data/Categories';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

const Home = ({name, setName, fetchQuestions}) => {
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState(false);


    const navigate = useNavigate();

    const handleSubmit = () => {
        if(!category || !difficulty || !name) {
            setError(true);
            return;
        } else {
            setError(false);
            fetchQuestions(category, difficulty);
            navigate('/quiz');
        }
    };

    return ( 
        <div className='content'>
            <div className='settings'>
                <span style={{fontSize: 30}}>Quiz Settings</span>

                <div className='settings_select'>
                    {error && <ErrorMessage>Please Fill all the fields.</ErrorMessage>}

                    <TextField style={{marginBottom: 25}}
                     label='Enter Your Name' variant='outlined'
                     onChange={(e) => setName(e.target.value)}/>
                    <TextField select
                     style={{marginBottom: 30}}
                     onChange={(e) => setCategory(e.target.value)}
                     value={category}
                     label="Select Category" variant='outlined'>
                        {
                            Categories.map((cat) => (
                                <MenuItem key={cat.category} value={cat.value}>
                                    {cat.category}
                                </MenuItem>
                            ))
                        }
                     </TextField>

                     <TextField select
                     label="Select Difficulty" variant='outlined'
                     style={{marginBottom: 30}}
                     onChange={(e) => setDifficulty(e.target.value)}
                     value={difficulty}>
                        <MenuItem key="Easy" value="easy">
                            Easy
                        </MenuItem>
                        <MenuItem key="Medium" value="medium">
                            Medium
                        </MenuItem>
                        <MenuItem key="Hard" value="hard">
                            Hard
                        </MenuItem>
                     </TextField>

                     <Button variant='contained' color='primary' size='large'
                     onClick={handleSubmit}>
                        Start Quiz
                     </Button>
                </div>
            </div>

            <img src='/quiz.svg' className='banner' alt='Quiz image' />
        </div>
     );
}
 
export default Home;