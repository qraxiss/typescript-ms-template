import * as params from '../../types/params/sample'
import * as returns from '../../types/returns/sample'

import { ErrorHelper, deleteId } from 'backend-helper-kit'

import { SampleModel } from '../../../database/models/sample'
import { avalidator } from '../../validators/validator'

const errorHelper = new ErrorHelper(__filename)

export class SampleLogic {
    @avalidator
    @deleteId
    static async createSample(params: params.createSample): Promise<returns.createSample> {
        var result = await SampleModel.create(params.body)
        errorHelper.createError(result)

        result = result.toObject()
        return result
    }

    @avalidator
    static async updateSample(params: params.updateSample): Promise<returns.updateSample> {
        var result = await SampleModel.updateOne(params.query, { $set: params.body })
        errorHelper.updateError(result)

        return result.modifiedCount > 0
    }

    @avalidator
    static async deleteSample(params: params.deleteSample): Promise<returns.deleteSample> {
        var result = await SampleModel.deleteOne(params.query)
        errorHelper.deleteError(result)

        return result.deletedCount > 0
    }

    @avalidator
    @deleteId
    static async getSample(params: params.getSample): Promise<returns.getSample> {
        var result = await SampleModel.findOne(params.query)
        errorHelper.getError(result)

        return result!.toObject()
    }

    @avalidator
    @deleteId
    static async getSamples(params: params.getSamples): Promise<returns.getSamples> {
        var result = await SampleModel.find(params.query)
        errorHelper.getAllError(result)

        return result.map((item) => {
            return item.toObject()
        })
    }
}
