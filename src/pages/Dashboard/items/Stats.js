import React, { useState, useEffect } from "react";
import { Item, Title } from "../Dashboard-style";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { Amount } from "../../../components";
import { renderAmount } from "../../../functions";
import { CategoryLabel } from "../../../components/form/custom/CategoryInput-style";
import { Select } from "../../../components/form/unvalidate";
import moment from "moment";
import _ from "lodash";

const Container = styled(Item)`
  display: flex;
  flex-direction: column;
`;

const StatsTitle = styled(Title)`
  margin-bottom: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
`;

const SelectContainer = styled.div`
  margin-left: 2rem;
  width: 40%;
  min-width: 12.5rem;
  width: 15rem;
  z-index: 30;

  > div {
    margin-top: 0;
    margin-bottom: 0;
    z-index: 30;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Summary = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 3rem;
  // background: green;

  > div:first-child {
    margin-bottom: 1rem;
  }
`;

const Spacer = styled.div`
  width: 3rem;
  height: 100%;
  // background: grey;
`;

const SummaryRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const SummaryItem = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  height: 100%;
  width: 100%;
  border: 1px solid ${(props) => props.theme.text_light};

  ${(props) => {
    if (props.expense) {
      return {
        border: "none",
      };
    }
  }};

  &.income {
    margin-right: 1rem;
  }

  .amount {
    font-size: 1.4rem;
  }
`;

const SummaryItemTitle = styled.div`
  font-size: 1.4rem;
  color: ${(props) => props.theme.text_light};
  margin-bottom: 1rem;
`;

const ChartContainer = styled.div`
  height: 100%;
  width: 50%;
  min-width: 35rem;
  // background: salmon;
`;

const Stats = () => {
  const {
    settings: { lang, currency },
    user: { transactions, current_period },
    categories: { expense, income },
    theme,
    text: { currentPage: text },
    ui: { filters },
  } = useSelector((state) => state);

  let _expense = 0;
  let _income = 0;

  transactions.forEach((transaction) => {
    if (transaction.period === current_period) {
      if (transaction.type === "expense") {
        _expense += parseInt(transaction.amount);
      }
      if (transaction.type === "income") {
        _income += parseInt(transaction.amount);
      }
    }
  });

  const [filter, setFilter] = useState("all");
  const [currentCategory, setCurrentCategory] = useState("all");
  const [expensesData, setExpensesData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [currentTotal, setCurrentTotal] = useState(0);

  const expensesMasterName = [];
  const expensesSubName = [];

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const tempData = {};
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
        }
      });

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
      setExpensesData(formatData);
    } else {
      setChartData({
        isEmpty: true,
        labels: ["Jan", "Feb", "March"],
        datasets: [
          {
            barPercentage: 1,
            barThickness: 20,
            label: "Income",
            backgroundColor: theme.backgroundColor,
            data: [17, 20, 28],
          },
          // {
          //   barPercentage: 1,
          //   barThickness: 20,
          //   label: "Expense",
          //   backgroundColor: "black",
          //   data: [5, 9, 4],
          // },
        ],
      })
    } 
  }, [transactions]);

  useEffect(() => {
    const data = [];
    const expensesBackgroundColor = [];
    const expensesLabels = [];
    const expenseLocale = [];

    if (expensesData) {
      if (currentCategory === "all") {
        Object.keys(expensesData).forEach((item) => {
          expenseLocale.push(item);
          expensesLabels.push(text[item]);
          expensesBackgroundColor.push(expense[item].color);
          let _total = 0;
          Object.keys(expensesData[item]).forEach((i) => {
            _total += expensesData[item][i].amount;
          });
          data.push(_total);
        });
      } else {
        const categoryData = expensesData[currentCategory];
        Object.keys(categoryData).forEach((subCat) => {
          expenseLocale.push(subCat);
          expensesLabels.push(text[subCat]);
          expensesBackgroundColor.push(expense[currentCategory].color);
          data.push(categoryData[subCat].amount);
        });
      }

      setChartData({
        datasets: [
          {
            data,
            backgroundColor: expensesBackgroundColor,
            borderColor: theme.surface,
          },
        ],
        labels: expensesLabels,
        expenseLocale,
      });

      let _currentTotal = 0;
      data.forEach((expense) => (_currentTotal += expense));
      setCurrentTotal(_currentTotal);
    }
  }, [expensesData]);

  // if(filter === "all"){
  //   transactions = _transactions
  // } else {
  //     transactions = _transactions.filter(transaction => new Date(transaction.date) <= filters[filter].end && new Date(transaction.date) >= filters[filter].start )
  // }

  const filterHandler = (value) => {
    setFilter(value);
  };

  const optionsA = [
    {
      label: text.all_f,
      value: "all",
    },
    {
      label: text.this_week,
      value: "this_week",
    },
    {
      label: text.this_month,
      value: "this_month",
    },
    {
      label: text.this_year,
      value: "this_year",
    },
    {
      label: `7 ${text.days}`,
      value: "7_days",
    },
    {
      label: `30 ${text.days}`,
      value: "30_days",
    },
    {
      label: `3 ${text.months}`,
      value: "3_months",
    },
    {
      label: `6 ${text.months}`,
      value: "6_months",
    },
    {
      label: `1 ${text.year}`,
      value: "1_year",
    },
  ];

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: chartData && !chartData.isEmpty ? true : false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            maxTicksLimit: 6,
          },
        },
      ],
      xAxes: [{
        gridLines: {
            // display: false,
        },
    }],
    },
  };

  return (
    <Container>
      <StatsTitle>
        Stats
        <SelectContainer>
          {/* <Select
            input={{
              options: optionsA,
              isSearchable: false,
              customStyle: {
                custom_control: {
                  height: "3.8rem",
                  borderRadius: "1rem"
                } 
              }
            }}
            currentValue={filter}
            onChange={filterHandler}
          /> */}
        </SelectContainer>
      </StatsTitle>
      <Content>
        <Summary>
          <SummaryItem className="income">
            <SummaryItemTitle>Income</SummaryItemTitle>
            <Amount className="amount" value={_income} income />
          </SummaryItem>
          <SummaryItem>
            <SummaryItemTitle>Expense</SummaryItemTitle>
            <Amount className="amount" value={_expense} />
          </SummaryItem>
        </Summary>
        <Spacer />
        <ChartContainer>
          <Bar
            data={chartData}
            options={options}
          />
        </ChartContainer>
      </Content>
    </Container>
  );
};

export default Stats;
