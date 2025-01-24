const data = {
  data: {
    defaultFormData: {
      conversion_cycle: "",
    },
    dataList: [
      {
        code: "conversion_cycle",
        label: "转化周期",
        placeholder: "",
        component: "select",
        required: false,
        width: "150px",
        clearable: false,
        options: [
          {
            typeName: "转化周期",
            filterCode: "conversion_cycle",
            value: "",
            label: "累计",
            sort: "0",
            children: [],
            remark: "",
          },
          {
            typeName: "转化周期",
            filterCode: "conversion_cycle",
            value: "1",
            label: "7天",
            sort: "1",
            children: [],
            remark: "",
          },
          {
            typeName: "转化周期",
            filterCode: "conversion_cycle",
            value: "2",
            label: "15天",
            sort: "2",
            children: [],
            remark: "",
          },
          {
            typeName: "转化周期",
            filterCode: "conversion_cycle",
            value: "3",
            label: "30天",
            sort: "3",
            children: [],
            remark: "",
          },
        ],
      },
    ],
  },
  code: 200,
  message: "",
  extendInfo: {},
  detailMessage: "",
};

module.exports = data;
