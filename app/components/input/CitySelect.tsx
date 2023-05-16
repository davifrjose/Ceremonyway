'use client'

import useStateCities from '@/app/hooks/useCities';
import Select from 'react-select'

export type CitySelectValue = {
  
  label: string;
  latitude: number[],
  longitude: number[];
  value: string
}

interface CitySelectProps {
  value?: CitySelectValue;
  onChange: (value: CitySelectValue) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({
  value,
  onChange
}) => {
  const { getAll } = useStateCities() 
  return (
    <div>
      <Select 
       placeholder="Em qualquer lugar"
       isClearable
       options={getAll()}
       value={value}
       onChange={(value) => onChange(value as CitySelectValue)}
       formatOptionLabel={(option: any) => (
        <div className="
        flex flex-row items-center gap-3">
          <div>
            {option.label}
          </div>
        </div>
      )}
      classNames={{
        control: () => 'p-3 border-2',
        input: () => 'text-lg',
        option: () => 'text-lg'
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: 'black',
          primary25: '#ffe4e6'
        }
      })}
      
      />

    </div>
  )
}

export default CitySelect