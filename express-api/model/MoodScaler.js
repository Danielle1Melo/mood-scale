import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

class MoodScaler {
    constructor() {
        const moodScalerSchema = new mongoose.Schema({
            humor: {
                type: String,
                enum: ['animado', 'entediado', 'neutro', 'estressado', 'triste'],
                required: true,
                index: true
            },
            timestamp: {
                type: Date,
                default: Date.now,
                required: true
            },
            ip_address: {
                type: String,
                required: false
            }
        }, {
            timestamps: true 
        });

        moodScalerSchema.plugin(mongoosePaginate);

        moodScalerSchema.index({ humor: 1, timestamp: -1 });

        this.model = mongoose.model("mood_scalers", moodScalerSchema);
    }
}

export default new MoodScaler().model;