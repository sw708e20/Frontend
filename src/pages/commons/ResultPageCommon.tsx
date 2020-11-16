import React, {ReactElement} from "react";
import {Education, EducationType} from '../../services/QuestionManager'

class ResultPageCommon {
    renderEducationInfo(edu: Education) {
        return (
            <div>
                <div className={'row justify-content-center'}>
                    <div className={'col'}>
                        <h3 className={'education-header'}> {edu.name} </h3>
                    </div>
                </div>
                <hr/>
                <div className={'row justify-content-center'}>
                    <div className={'col-10'}> {edu.description} </div>
                </div>
            </div>
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

        return elems
    }
}

export const resultPageCommon = new ResultPageCommon();