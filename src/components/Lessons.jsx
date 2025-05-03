import React, { useEffect } from 'react'
import { useState } from 'react'

function Lessons() {

const [verseText, setVerseText] = useState('');
const[lesson, setLesson] = useState([])
const[selectedVirtue, setSelectedVirtue] = useState('')
const[loading, setLoading]= useState(true)
const[error, setError] = useState(null)


useEffect(()=>{
        fetch('https://api.sheetbest.com/sheets/43e17bd7-2411-4fdd-8ee3-09c1778a06d7')
        .then((res)=>res.json())
        .then((data)=> {
        setLesson(data);
        setLoading(false);
    })

    .catch((err)=>{
      setError("Failed to load lessons");
      setLoading(false);

    });
    }, [])

    // Get all stories for the selected virtue
const storiesForVirtue = lesson.filter((lesson) => lesson.Virtue === selectedVirtue);

// Get the featured story (if any)
const featuredStory = storiesForVirtue.find((lesson) => lesson.IsFeatured === 'TRUE');

// Get the other related stories (non-featured)
const relatedStories = storiesForVirtue.filter((lesson) => lesson.IsFeatured !== 'TRUE');

// Fetch Bible verse text for the featured story


useEffect(() => {
  if (featuredStory?.Reference) {
    const verse = encodeURIComponent(featuredStory.Reference);
    fetch(`https://bible-api.com/${verse}?translation=kjv`)
      .then(res => res.json())
      .then(data => {
        if (data.verses) {
          const fullText = data.verses.map(v => `${v.text.trim()} (${v.book_name} ${v.chapter}:${v.verse})`).join(' ');
          setVerseText(fullText);
        } else if(data.text) {
          setVerseText(`${data.text.trim()} (${data.reference})`);
        } else {
          setVerseText("Verse not found.")
        }
      });
  }
}, [featuredStory]);

 // Get unique virtues for dropdown
const uniqueVirtues = [...new Set(lesson.map(l => l.Virtue))].sort();

if (loading) return <p>Loading lessons...</p>;
if (error) return <p>{error}</p>;

  return (
    <div>
        <h2>Sunday School Lesson</h2>

        <select onChange={(e)=>setSelectedVirtue(e.target.value)} value = {selectedVirtue}> 
        
        <option value="">Select Lesson</option>

        {uniqueVirtues.length > 0 ? (
          uniqueVirtues.map((virtue, index) => (
            <option key={index} value={virtue}>
              {virtue}
            </option>
          ))
        ) : (
          <option>No virtues available</option>
        )}
      </select>

      {selectedVirtue && (
        <div>
          <h2>{selectedVirtue}</h2>

          {/* Display featured story if available */}
          {featuredStory && (
            <div>
              <h3>{featuredStory.StoryTitle}</h3>
              <p><strong>Bible Verse:</strong> {featuredStory.Reference}</p>
              <p><strong>Verse Text:</strong> {verseText || "Loading Verse ..."}</p>
              <p><strong>Summary:</strong> {featuredStory.Summary}</p>
              <p><strong>Lesson:</strong> {featuredStory.Lesson}</p>
            </div>
          )}

          {/* Display other related stories */}
          {relatedStories.length > 0 && (
            <div>
              <h4>Other stories about {selectedVirtue}:</h4>
              <ul>
                {relatedStories.map((story, index) => (
                  <li key={index}>
                    <strong>{story.Story}</strong> {story.Reference}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Lessons;