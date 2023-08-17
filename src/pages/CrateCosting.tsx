import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

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
          <Button minWidth='10rem' onClick={() => choiceFunction(value)}>
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
    </div>
  )
}
