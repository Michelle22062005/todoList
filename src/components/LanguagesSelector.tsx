"use client"
import { useTranslation } from "@/context/i18nContext";
import { Language } from "@/locales/translation";

const languages: { value: Language; label:string}[]=[
     { value: "es", label: "ESPAÑOL" },
  { value: "en", label: "ENGLISH" },
  { value: "pt", label: "PORTUGUESE" },
];

export const LanguageSelector =()=>{
    const {language, setLanguage}= useTranslation();

    return(
        <select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="border border-[#5a4e5a] rounded px-2 py-1 text-sm bg-transparent text-white ">
            {languages.map((lang)=>(
                <option className="bg-black" key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
            
        </select>
    )
}