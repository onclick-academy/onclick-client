export function Lecture({ lecture }) {

  function limitParagraphByChars(paragraph, maxLength) {
    if (paragraph.length > maxLength) {
      return paragraph.slice(0, maxLength) + '...'
    }
    return paragraph
  }

  return (
    <div style={{ width: '100%', height: '6rem', display: 'flex' }}>
      <div style={{ width: '10%' }}>
        <img style={{ width: '100%', margin: '20px 0' }} src={lecture.thumbnail} alt='video' />
      </div>
      <div style={{ padding: '1rem', width: '90%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4 style={{ color: '#164863' }}>{lecture.title}</h4>
          <p style={{ color: '#164863' }}>{lecture.duration}</p>
        </div>
        <div>
          <span>{limitParagraphByChars(lecture.description, 200)}</span>
        </div>
      </div>
    </div>
  )
}
