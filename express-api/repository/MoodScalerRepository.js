import MoodScaler from "../model/MoodScaler.js";

class MoodScalerRepository {
  async findAll(filters = {}, options = {}) {
    const defaultOptions = {
      page: 1,
      limit: 10,
      sort: { timestamp: -1 },
      lean: true,
    };

    const queryOptions = { ...defaultOptions, ...options };

    return await MoodScaler.paginate(filters, queryOptions);
  }

  async findById(id) {
    return await MoodScaler.findById(id).lean();
  }

  async create(data) {
    const doc = new MoodScaler({
      humor: data.humor,
      ip_address: data.ip_address || null,
    });

    return await doc.save();
  }

  async countByHumor() {
    return await MoodScaler.aggregate([
      {
        $group: {
          _id: "$humor",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
  }
}

export default MoodScalerRepository;
