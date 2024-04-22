import { InputContainer, InputRow, StyledInput } from './InputFormComponents'
import { Button, Dropdown } from '..'
import { woodSizes } from '../../constants'

function filterBearerSizes (
  woodSizes: { value: string; label: string }[],
  woodType: 'kilnDry' | 'wetOffSaw',
  forkliftOnly: boolean
): { value: string; label: string }[] {
  if (woodType === 'wetOffSaw') return woodSizes

  const allowedSizesForklift: Array<String> = ['38x114', '76x228']
  if (!forkliftOnly)
    return woodSizes.filter(size => allowedSizesForklift.includes(size.value))

  const allowedSizes: Array<String> = ['38x76', '38x114', '50x76', '76x228']
  return woodSizes.filter(size => allowedSizes.includes(size.value))
}

export default ({
  numberOfBearers,
  bearerSize,
  bottomSlatSizes,
  stepSixError,
  setBaseCrateValues,
  finaliseCrateBase,
  bearerWoodType,
  setBearerWoodType,
  woodType,
  forkliftOnly,
  forExport
}: {
  numberOfBearers: Number
  bearerSize: String
  bottomSlatSizes: String
  stepSixError: String
  setBaseCrateValues: Function
  finaliseCrateBase: Function
  bearerWoodType: 'kilnDry' | 'wetOffSaw'
  setBearerWoodType: Function
  woodType: 'Kiln Dry' | 'Wet Offsaw'
  forkliftOnly: boolean
  forExport: boolean
}) => {
  const woodTypeParam: 'kilnDry' | 'wetOffSaw' =
    woodType === 'Kiln Dry' ? 'kilnDry' : 'wetOffSaw'

  return (
    <>
      <h2>Base of Crate</h2>
      <InputContainer>
        <InputRow>
          <h4>Number of bearers</h4>
          <StyledInput
            onChange={e =>
              setBaseCrateValues('numberOfBearers', e.target.value)
            }
            onClick={e => {
              const target = e.target as HTMLInputElement
              target.select()
            }}
            type='text'
            value={String(numberOfBearers)}
          />
        </InputRow>
        {!forExport && (
          <InputRow>
            <h4>Type of Wood for Bearers</h4>
            <Dropdown
              options={[
                { value: 'kilnDry', label: 'Kiln Dry' },
                { value: 'wetOffSaw', label: 'Wet Off Saw' }
              ]}
              onChange={(e: { value: String }) => {
                const value: String = e.value
                setBearerWoodType(value)
              }}
              placeholder='Choose type of wood for bearers'
              value={bearerWoodType}
            />
          </InputRow>
        )}
        <InputRow>
          <h4>Width and thickness of bearers</h4>
          <Dropdown
            options={filterBearerSizes(
              woodSizes[bearerWoodType],
              bearerWoodType,
              forkliftOnly
            )}
            onChange={(e: { value: String }) => {
              const value: String = e.value
              setBaseCrateValues('bearerSize', value)
            }}
            placeholder='Select bearer width and thickness'
            value={bearerSize}
          />
        </InputRow>
        <InputRow>
          <h4>Width and thickness of bottom slats</h4>
          <Dropdown
            options={woodSizes[woodTypeParam]}
            onChange={(e: { value: String }) => {
              const value: String = e.value
              setBaseCrateValues('bottomSlatSizes', value)
            }}
            placeholder='Select bottom slats width and thickness'
            value={bottomSlatSizes}
          />
        </InputRow>
        {stepSixError && <p style={{ color: 'red' }}>{stepSixError}</p>}
        <Button onClick={() => finaliseCrateBase()}>Finalise crate base</Button>
      </InputContainer>
    </>
  )
}
