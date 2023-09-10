import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import * as R from 'ramda'

import { constingsTypes, containerTypes, woodTypes } from '../constants'
import { Button, CostingChoiceButton } from '../components'

const ContentContainer = styled.div`
  display: flex;

  ${props =>
    props.column
      ? `
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;
  `
      : `justify-content: center;`}
`

const InputContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const InputRow = styled.div`
  align-items: center;
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  width: 30%;

  h3 {
    margin: 0;
    padding: 0;
    padding-right: 0.5em;
  }

  p {
    margin: 0;
    padding: 0;
  }
`

const StyledInput = styled.input`
  border: 1px solid #333;
  border-radius: 10px;
  margin: 0;
  padding: 0.5rem 0.5rem;
  transition: all 0.3s;

  &:focus {
    border: 1px solid #000060;
    box-shadow: 0 0 3px 1px #000060;
    outline: none;
  }
`

const CostingTypeChoice = ({ chooseType }: { chooseType: Function }) => {
  return (
    <>
      <h2>Choose what to cost</h2>
      <ContentContainer>
        <CostingChoiceButton onClick={() => chooseType(constingsTypes.BOX)}>
          <i className='fas fa-archive'></i>
          Box Costing
        </CostingChoiceButton>
      </ContentContainer>
    </>
  )
}

const YesNoChoice = ({
  question,
  choiceFunction
}: {
  question: string
  choiceFunction: Function
}) => {
  return (
    <>
      <h2>{question}</h2>
      <ContentContainer>
        <Button onClick={() => choiceFunction(true)}>Yes</Button>
        <Button onClick={() => choiceFunction(false)}>No </Button>
      </ContentContainer>
    </>
  )
}

const MultiChoice = ({
  question,
  choiceFunction,
  choices
}: {
  question: string
  choiceFunction: Function
  choices: Array<string>
}) => {
  return (
    <>
      <h2>{question}</h2>
      <ContentContainer column>
        {choices.map(value => (
          <Button minWidth='13rem' onClick={() => choiceFunction(value)}>
            {value}
          </Button>
        ))}
      </ContentContainer>
    </>
  )
}

export const CrateCosting = (): JSX.Element => {
  const prices = useSelector((state: any) => state.prices)
  const [step, setStep] = useState(0)

  const [costingType, setCostingType] = useState(constingsTypes.NONE)
  const [forExport, setForExport] = useState(false)
  const [woodType, setWoodType] = useState('')
  const [inContainer, setInContainer] = useState(false)
  const [containerType, setContainerType] = useState('')
  const [innerDimensions, setInnerDimensions] = useState({
    length: 0,
    width: 0,
    height: 0,
    err: ''
  })
  const [carryingCapacity, setCarryingCapacity] = useState({
    value: 0,
    err: ''
  })
  const [forkliftOnly, setForkliftOnly] = useState(false)

  const chooseCostingType = (choice: string) => {
    setCostingType(choice)
    setStep(1)
  }

  const chooseExport = (choice: boolean) => {
    setForExport(choice)
    if (choice) {
      setWoodType(woodTypes.KILNDRY)
      setStep(2)
    } else setStep(1.1)
  }

  const woodTypeOptions = [woodTypes.KILNDRY, woodTypes.WETOFFSAW]

  const chooseWood = (woodType: string) => {
    if (woodType === woodTypes.KILNDRY) setWoodType(woodTypes.KILNDRY)
    else setWoodType(woodTypes.WETOFFSAW)
    setStep(2)
  }

  const chooseContainer = (choice: boolean) => {
    setInContainer(choice)
    if (choice) setStep(2.1)
    else setStep(3)
  }

  const containerTypeChoices = [
    containerTypes.TENFOOT,
    containerTypes.TWENTYFOOT,
    containerTypes.TWENTYFOOTHC,
    containerTypes.FORTYFOOR
  ]

  const chooseContainerType = (containerType: string) => {
    setContainerType(containerType)
    setStep(3)
  }

  const setDimensions = (
    dimension: 'length' | 'width' | 'height',
    value: string
  ) => {
    const newDimensions = { ...innerDimensions }

    if (isNaN(Number(value))) {
      newDimensions.err = 'Only numbers are allowed'
      return setInnerDimensions(newDimensions)
    }

    if (dimension === 'length') {
      newDimensions.length = Number(value)
    } else if (dimension === 'width') {
      newDimensions.width = Number(value)
    } else if (dimension === 'height') {
      newDimensions.height = Number(value)
    }

    newDimensions.err = ''
    setInnerDimensions(newDimensions)
  }

  const finaliseDimensions = () => {
    const onlyDimensions = R.omit(['err'], innerDimensions)
    const allValuesValid = R.values(onlyDimensions).every(
      (value: number) => value > 0
    )

    if (!allValuesValid) {
      const newDimensions = { ...innerDimensions }
      newDimensions.err = 'All dimensions must be greater than 0'
      return setInnerDimensions(newDimensions)
    }

    setStep(4)
  }

  const setCarryCap = (value: string) => {
    const newCarryCapacity = { ...carryingCapacity }

    if (isNaN(Number(value))) {
      newCarryCapacity.err = 'Only numbers are allowed'
      return setCarryingCapacity(newCarryCapacity)
    }

    newCarryCapacity.value = Number(value)
    newCarryCapacity.err = ''
    setCarryingCapacity(newCarryCapacity)
  }

  const finaliseCarryCapacity = () => {
    const carryCapacityValid = carryingCapacity.value > 0

    if (!carryCapacityValid) {
      const newCarryCapacity = { ...carryingCapacity }
      newCarryCapacity.err = 'All dimensions must be greater than 0'
      return setCarryingCapacity(newCarryCapacity)
    }

    setStep(5)
  }

  const forkliftOnlyChoices = ['Forklift Only', 'Forklift and Trolley']

  const chooseForkliftOnly = (forkliftOnly: boolean) => {
    setForkliftOnly(forkliftOnly)
    setStep(6)
  }

  return (
    <div>
      {step === 0 && <CostingTypeChoice chooseType={chooseCostingType} />}

      {step === 1 && (
        <YesNoChoice
          question='Is the crate for exporting purposes?'
          choiceFunction={chooseExport}
        />
      )}

      {step === 1.1 && (
        <MultiChoice
          question='Is the wood Kiln dry or wet offsaw?'
          choiceFunction={chooseWood}
          choices={woodTypeOptions}
        />
      )}

      {step === 2 && (
        <YesNoChoice
          choiceFunction={chooseContainer}
          question='Is the crate going to be transported in a container?'
        />
      )}

      {step === 2.1 && (
        <MultiChoice
          choiceFunction={chooseContainerType}
          question='What container spec is it going into?'
          choices={containerTypeChoices}
        />
      )}

      {step === 3 && (
        <>
          <h2>Please specify inner dimensions in cm</h2>
          <InputContainer>
            <InputRow>
              <h3>Length</h3>
              <StyledInput
                onChange={e => setDimensions('length', e.target.value)}
                onClick={e => {
                  const target = e.target as HTMLInputElement
                  target.select()
                }}
                type='text'
                value={innerDimensions.length}
              />
            </InputRow>
            <InputRow>
              <h3>Width</h3>
              <StyledInput
                onChange={e => setDimensions('width', e.target.value)}
                onClick={e => {
                  const target = e.target as HTMLInputElement
                  target.select()
                }}
                type='text'
                value={innerDimensions.width}
              />
            </InputRow>
            <InputRow>
              <h3>Height</h3>
              <StyledInput
                onChange={e => setDimensions('height', e.target.value)}
                onClick={e => {
                  const target = e.target as HTMLInputElement
                  target.select()
                }}
                type='text'
                value={innerDimensions.height}
              />
            </InputRow>
            {innerDimensions.err && (
              <p style={{ color: 'red' }}>{innerDimensions.err}</p>
            )}
            <Button onClick={finaliseDimensions}>Set Dimensions</Button>
          </InputContainer>
        </>
      )}

      {step === 4 && (
        <>
          <h2>Please specify carrying capacity in kg</h2>
          <InputContainer>
            <InputRow>
              <h3>Capacity</h3>
              <StyledInput
                onChange={e => setCarryCap(e.target.value)}
                onClick={e => {
                  const target = e.target as HTMLInputElement
                  target.select()
                }}
                type='text'
                value={carryingCapacity.value}
              />
            </InputRow>
            {carryingCapacity.err && (
              <p style={{ color: 'red' }}>{carryingCapacity.err}</p>
            )}
            <Button onClick={finaliseCarryCapacity}>
              Set Carrying Capacity
            </Button>
          </InputContainer>
        </>
      )}

      {step === 5 && (
        <MultiChoice
          choiceFunction={chooseForkliftOnly}
          question='Is it loaded by forklift only, or forklift and pallet Trolley?'
          choices={forkliftOnlyChoices}
        />
      )}
    </div>
  )
}
