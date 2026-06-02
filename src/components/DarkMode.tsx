"use client";

import { ContextGlobal } from "@/context/Context";
import { Moon, Sun } from "@gravity-ui/icons";
import { Label, Switch } from "@heroui/react";
import { useContext } from "react";

export const DarkMode = () => {
  const { isSelected, setIsSelected } = 
  useContext(ContextGlobal);
  const icons = {
    darkMode: {
      off: Moon,
      on: Sun,
      selectedControlClass: "",
    }
  }

  return (
    <div className="p-2 w-40">
     
      {Object.entries(icons).map(([key, value]) => (
        <Switch key={key} defaultSelected size="lg">
          {({isSelected}) => (
            <>
              <Switch.Control className={isSelected ? value.selectedControlClass : ""}>
                <Switch.Thumb>
                  <Switch.Icon>
                    {isSelected ? (
                      <value.on className="size-3 text-inherit opacity-100" />
                    ) : (
                      <value.off className="size-3 text-inherit opacity-70" />
                    )}
                    
                  </Switch.Icon>
                  
                </Switch.Thumb>
                
              </Switch.Control>
               {isSelected ? (
        <div className="text-blue-800">
            <img src="https://www.lavanguardia.com/r/GODO/LV/p3/WebSite/2016/06/21/img_trubies_20160621-122345_imagenes_lv_otras_fuentes_luna3.jpg" alt="moon" className="size-8"/>
        </div>
      ) : (
        <div className="text-green-500">
            <img src="https://s.13.cl/sites/default/files/styles/manualcrop_850x475/public/13c/articulos/field-imagen/2024-02/SOL%20%28Getty%20Images%29.png.jpeg?itok=yLfdV9GH" alt="sun" className="size-10"/>
        </div>
      )}
            </>
          )}
        </Switch>
      ))} 
     
    </div>
  );
};