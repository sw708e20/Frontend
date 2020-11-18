import React, {ReactElement} from "react";
import {Education, EducationType} from '../../services/QuestionManager'

class ResultPageCommon {
    renderEducationInfo(edu: Education) {
        return (
            [
                <div className={'card-header'}>
                        <h3>{edu.name}</h3>
                </div>,
                <div className={'card-body'}>
                    <p className={'card-text'}> {edu.description}</p>
                </div>
                ]
        )
    }

    renderEducationTypes(eduTypes: EducationType[]) {
        let elems: ReactElement[] = []
        

        for (let eduType of eduTypes) {
            elems.push(
                <div key={eduType.id} className={'row justify-content-center'}>
                    <div className={'col-6'}><p> {eduType.name} </p></div>
                    <div className={'col-6'}><a href={eduType.url}> Link to www.ug.dk </a></div>
                </div>
            )
        }

        return (
            <div className={'card-footer'}>
                {elems}
            </div>
        )
    }
}

export const resultPageCommon = new ResultPageCommon();