import { useState } from "react";
import "./App.css";
import {
  PracticalExperience,
  EducationalExperience,
  GeneralInformation,
  Languages,
  CurriculumVitae,
  CVData
} from "./components";

function App() {
  // Estado inicial vacío
  const [cvData, setCvData] = useState<CVData>({
    general: {
      name: "", title: "", email: "", phone: "", location: "", website: ""
    },
    education: {
      school: "", degree: "", date: ""
    },
    experience: {
      company: "", role: "", description: "", startDate: "", endDate: ""
    },
    languages: []
  });

  const handleInputChange = (section: string, field: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev], // TypeScript trick
        [field]: value
      }
    }));
  };

  const addLanguage = (lang: string) => {
    setCvData(prev => ({ ...prev, languages: [...prev.languages, lang] }));
  };

  const removeLanguage = (index: number) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  return (
    <section className="Container">
      
      <section className="InfoContainer">
        <h1>Editor de CV</h1>

        <section>
          <h2>Información General</h2>
          <GeneralInformation 
            data={cvData.general} 
            onChange={handleInputChange} 
          />
        </section>

        <section>
          <h2>Educación</h2>
          <EducationalExperience 
            data={cvData.education} 
            onChange={handleInputChange} 
          />
        </section>

        <section>
          <h2>Experiencia Laboral</h2>
          <PracticalExperience 
             data={cvData.experience} 
             onChange={handleInputChange} 
          />
        </section>

        <section>
          <h2>Idiomas</h2>
          <Languages 
            list={cvData.languages} 
            onAdd={addLanguage}
            onRemove={removeLanguage}
          />
        </section>
      </section>

      <section className="CurriculumVitae">
        <CurriculumVitae data={cvData} />
      </section>

    </section>
  );
}

export default App;