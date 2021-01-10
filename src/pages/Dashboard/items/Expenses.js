import React, { useState } from "react";
import { Item, Title } from "../Dashboard-style";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { Amount } from "../../../components";
import { renderAmount } from "../../../functions";
import { SelectInput } from "../../../functions/form";
import moment from 'moment'

const ExpensesTitle = styled(Title)`
    margin-bottom: 1.2rem;
`

const Container = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 20rem;
    max-width: 40%;
    z-index: 30;

    > div {
        margin-top: 0;
        z-index: 30;
    }
`;

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
  padding: 1rem;
  padding-top: 2rem;

  canvas {
    height: 100%;
  }
`;

const Total = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
  margin: auto;
  // background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  // box-shadow: ${(props) => props.theme.box_shadow_inset};
  border-radius: 50%;
  width: 8.5em;
  height: 8.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
`;

const Expenses = () => {
  const {
    settings: { lang, currency },
    user: { transactions: _transactions },
    categories: { expense },
    theme,
    text: { currentPage: text },
  } = useSelector((state) => state);

  const [filter, setFilter] = useState("all");

  const expensesData = [];
  const expensesBackgroundColor = [];
  const expensesLabels = [];
  const expensesMasterName = [];
  const expensesSubName = [];

  let total = 0;
  let transactions = []

  const filters = {
    all: "all",
    this_week:  {
        start: moment().startOf('week').toDate(),
        end: moment().endOf('week').toDate()
    },
    this_month: {
        start: moment().startOf('month').toDate(),
        end: moment().endOf('month').toDate()
    },
    this_year: {
        start: moment().startOf('year').toDate(),
        end: moment().endOf('year').toDate()
    },
    "7_days": {
        start: moment().subtract(7, 'd').toDate(),
        end: moment().toDate()
    },
    "30_days": {
        start: moment().subtract(30, 'd').toDate(),
        end: moment().toDate()
    },
    "3_months": {
        start: moment().subtract(3, 'months').toDate(),
        end: moment().toDate()
    },
    "6_months": {
        start: moment().subtract(6, 'months').toDate(),
        end: moment().toDate()
    },
    "1_year": {
        start: moment().subtract(6, 'year').toDate(),
        end: moment().toDate()
    }
  }

  if(filter === "all"){
    transactions = _transactions
  } else {
      transactions = _transactions.filter(transaction => new Date(transaction.date) <= filters[filter].end && new Date(transaction.date) >= filters[filter].start )
  }

  const tempData = {};
  if (transactions && transactions.length > 0) {
    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        if (!tempData[transaction.category.sub_name]) {
          tempData[transaction.category.sub_name] = {
            amount: parseInt(transaction.amount),
            master_name: transaction.category.master_name,
          };
        } else {
          tempData[transaction.category.sub_name].amount += parseInt(
            transaction.amount
          );
          tempData[transaction.category.sub_name].master_name =
            transaction.category.master_name;
        }

        total += parseInt(transaction.amount);
      }
    });
  }

  const formatData = {};
  Object.keys(tempData).forEach((item) => {
    if (!formatData[tempData[item].master_name]) {
      formatData[tempData[item].master_name] = {};
      formatData[tempData[item].master_name][item] = {
        ...tempData[item],
      };
    } else {
      formatData[tempData[item].master_name][item] = {
        ...tempData[item],
      };
    }
  });

  Object.keys(formatData).forEach((item) => {
    for (const i in formatData[item]) {
      expensesMasterName.push(item);
    }
    Object.keys(formatData[item]).forEach((i) => {
      expensesSubName.push(i);
      expensesData.push(formatData[item][i].amount);
      expensesBackgroundColor.push(expense[item].color);
      expensesLabels.push(text[i]);
    });
  });
  

  const data = {
    datasets: [
      {
        data: expensesData,
        backgroundColor: expensesBackgroundColor,
        borderColor: theme.surface,
        expensesMasterName,
        expensesSubName,
      },
    ],
    labels: expensesLabels,
  };

  const options = {
    elements: {
      arc: {
        borderWidth: 4.5,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    // onClick: (e, arr) => test(e, arr),
    cutoutPercentage: 80,
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        title: function (tooltipItem, data) {
          return `${
            text[data.datasets[0].expensesMasterName[tooltipItem[0].index]]
          }`;
        },
        label: function (tooltipItem, data) {
          return `${data.labels[tooltipItem.index]}: ${renderAmount(
            data.datasets[0].data[tooltipItem.index],
            lang,
            currency.symbol
          )}`;
        },
      },
    },
  };

  const toggleTheme = (theme) => {
    setFilter(theme.value);
    // dispatch(actions.updateTheme(theme.value))
  };


  const optionsA = [
    {
      label:  text.all_f,
      value: "all"
    },
    {
        label: text.this_week,
        value: "this_week"
    },
    {
        label: text.this_month,
        value: "this_month"
    },
    {
        label: text.this_year,
        value: "this_year"
    },
    {
        label: `7 ${text.days}`,
        value: "7_days"
    },
    {
        label: `30 ${text.days}`,
        value: "30_days"
    },
    {
        label: `3 ${text.months}`,
        value: "3_months"
    },
    {
      label: `6 ${text.months}`,
      value: "6_months"
    },
    {
        label: `1 ${text.year}`,
        value: "1_year"
    }
  ];

//   console.log(optionsA)

  return (
    <Item>
      <ExpensesTitle> Expenses </ExpensesTitle>
      <Container>
        <SelectInput
          id="theme"
          options={optionsA}
          onChange={toggleTheme}
          placeholder="All"
          currentValue={filter}
          isSearchable={false}
        />
      </Container>
      <ChartContainer>
        <Doughnut data={data} options={options} />
        <Total>
          <Amount value={total} />
        </Total>
      </ChartContainer>
    </Item>
  );
};

export default Expenses;
