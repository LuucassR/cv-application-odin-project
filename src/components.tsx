import React, { useState } from "react";

export interface CVData {
  general: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
  };
  education: {
    school: string;
    degree: string;
    date: string;
  };
  experience: {
    company: string;
    role: string;
    description: string;
    startDate: string;
    endDate: string;
  };
  languages: string[];
}

interface SectionProps {
  data: any;
  onChange: (section: string, field: string, value: string) => void;
}

export function GeneralInformation({ data, onChange }: SectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange("general", e.target.name, e.target.value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>Nombre Completo</label>
      <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Ej. Juan Pérez" />
      
      <label>Título / Cargo</label>
      <input type="text" name="title" value={data.title} onChange={handleChange} placeholder="Ej. Frontend Developer" />
      
      <label>Email</label>
      <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
      
      <label>Teléfono</label>
      <input type="text" name="phone" value={data.phone} onChange={handleChange} placeholder="+54 9 11..." />
      
      <label>Ubicación</label>
      <input type="text" name="location" value={data.location} onChange={handleChange} placeholder="Ciudad, País" />
      
      <label>Sitio Web</label>
      <input type="text" name="website" value={data.website} onChange={handleChange} placeholder="www.miportfolio.com" />
    </form>
  );
}

export function EducationalExperience({ data, onChange }: SectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange("education", e.target.name, e.target.value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>Institución</label>
      <input type="text" name="school" value={data.school} onChange={handleChange} placeholder="Universidad..." />
      
      <label>Título obtenido</label>
      <input type="text" name="degree" value={data.degree} onChange={handleChange} placeholder="Ingeniería en..." />
      
      <label>Fecha</label>
      <input type="text" name="date" value={data.date} onChange={handleChange} placeholder="2018 - 2022" />
    </form>
  );
}

export function PracticalExperience({ data, onChange }: SectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange("experience", e.target.name, e.target.value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>Empresa</label>
      <input type="text" name="company" value={data.company} onChange={handleChange} placeholder="Tech Solutions Inc." />
      
      <label>Puesto</label>
      <input type="text" name="role" value={data.role} onChange={handleChange} placeholder="Senior Dev" />
      
      <label>Descripción</label>
      <input type="text" name="description" value={data.description} onChange={handleChange} placeholder="Lideré el equipo de..." />
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <input type="text" name="startDate" value={data.startDate} onChange={handleChange} placeholder="Inicio" />
        <input type="text" name="endDate" value={data.endDate} onChange={handleChange} placeholder="Fin" />
      </div>
    </form>
  );
}

interface LangProps {
  list: string[];
  onAdd: (lang: string) => void;
  onRemove: (index: number) => void;
}

export function Languages({ list, onAdd, onRemove }: LangProps) {
  const [newLanguage, setNewLanguage] = useState("");

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (newLanguage.trim()) {
      onAdd(newLanguage);
      setNewLanguage("");
    }
  };

  return (
    <div className="lang-form">
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={newLanguage}
          placeholder="Añadir idioma..."
          onChange={(e) => setNewLanguage(e.target.value)}
        />
        <button onClick={handleAdd} style={{marginTop: 0, width: '50px'}}>+</button>
      </div>

      <ul style={{ marginTop: '1rem', listStyle: 'none' }}>
        {list.map((item, i) => (
          <li key={i} style={{ background: 'white', padding: '5px 10px', marginBottom: '5px', borderRadius: '4px', display:'flex', justifyContent:'space-between', alignItems:'center', border: '1px solid #ddd' }}>
            {item}
            <button 
                onClick={() => onRemove(i)} 
                style={{ background: '#ff4757', padding: '2px 8px', marginTop: 0, fontSize: '0.8rem', marginLeft: '10px' }}>
                x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CurriculumVitae({ data }: { data: CVData }) {
  return (
    <>
      <div className="CV-Title">
        <h1>{data.general.name || "Tu Nombre"}</h1>
        <h2>{data.general.title || "Tu Título Profesional"}</h2>
      </div>

      <div className="SidebarLeft">
        
        <div className="Contact">
          <h3>Contacto</h3>
          <p>{data.general.phone || "+123 456 7890"}</p>
          <p>{data.general.email || "email@ejemplo.com"}</p>
          <p>{data.general.location || "Ciudad, País"}</p>
          <p>{data.general.website || "www.sitio.com"}</p>
        </div>

        <div className="Education">
          <h3>Educación</h3>
          <p><strong>{data.education.school}</strong></p>
          <p>{data.education.degree}</p>
          <p style={{ opacity: 0.7 }}>{data.education.date}</p>
        </div>

        <div className="Languages">
          <h3>Idiomas</h3>
          {data.languages.length > 0 ? (
             data.languages.map((lang, i) => <p key={i}>• {lang}</p>)
          ) : (
            <p>Español (Nativo)</p>
          )}
        </div>
      </div>

      <div className="MainContent">
        <div className="WorkExperience">
          <h3>Experiencia Laboral</h3>
          
          <div className="job-item">
            <div className="job-title">{data.experience.role || "Puesto de trabajo"}</div>
            <div style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.2rem'}}>{data.experience.company || "Nombre Empresa"}</div>
            <span className="job-date">
                {data.experience.startDate || "2020"} - {data.experience.endDate || "Presente"}
            </span>
            <p style={{ marginTop: '0.5rem' }}>
              {data.experience.description || "Aquí aparecerá la descripción de tus tareas y logros principales en este puesto de trabajo."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}