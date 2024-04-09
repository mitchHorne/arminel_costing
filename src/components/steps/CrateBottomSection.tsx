import { InputContainer, InputRow, StyledInput } from '../InputFormComponents'
import { Button, Dropdown } from '..'
import { woodSizes, woodTypes } from '../../constants'

export default ({
  numberOfBearers,
  bearerSize,
  bottomSlatSizes,
  stepSixError,
  setBaseCrateValues,
  finaliseCrateBase,
  woodType
}: {
  numberOfBearers: Number
  bearerSize: String
  bottomSlatSizes: String
  stepSixError: String
  setBaseCrateValues: Function
  finaliseCrateBase: Function
  woodType: string
}) => {
  const woodTypeParam: 'kilnDry' | 'wetOffSaw' =
    woodType === woodTypes.KILNDRY ? 'kilnDry' : 'wetOffSaw'

  return (
    <>
      <h2>Base of Crate</h2>
      <InputContainer>
        <InputRow>
          <h3>Number of bearers</h3>
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
        <InputRow>
          <h3>Width and thickness of bearers</h3>
          <Dropdown
            options={woodSizes[woodTypeParam]}
            onChange={(e: { value: String }) => {
              const value: String = e.value
              setBaseCrateValues('bearerSize', value)
            }}
            placeholder='Select bearer width and thickness'
            value={bearerSize}
          />
        </InputRow>
        <InputRow>
          <h3>Width and thickness of bottom slats</h3>
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
