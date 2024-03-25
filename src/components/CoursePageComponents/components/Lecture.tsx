export function Lecture({ lecture }) {
  const photo="https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg"
  return (
    <div style={{ width: '100%', height: '6rem', display:"flex"}}>
      <div style={{ width: '10%' }}>
        <img style={{ width: '100%', margin:"20px 0" }} src={photo} alt='video' />
      </div>
      <div style={{padding:"1rem", width:"90%"}}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <h4 style={{color:"#164863"}}>{lecture.title}</h4>
          <p style={{color:"#164863"}}>{lecture.duration}</p>
        </div>
        <div>
          <span>{lecture.description}</span>
          </div>
      </div>
    </div>
  )
}
