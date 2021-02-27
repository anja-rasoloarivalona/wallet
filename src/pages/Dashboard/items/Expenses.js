import React, { useState, useEffect } from "react";
import { Item, Title } from "../Dashboard-style";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { Amount } from "../../../components";
import { renderAmount } from "../../../functions";
import { CategoryLabel } from "../../../components/Form/custom/CategoryInput-style";
import { Select } from "../../../components/Form/unvalidate";
import _ from "lodash";

const Container = styled(Item)`
  display: flex;
  flex-direction: column;
`;

const ExpensesTitle = styled(Title)`
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
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

const ChartContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

const Chart = styled.div`
  width: 40%;
  height: 100%;
  position: relative;

  canvas {
    height: 100%;
  }
`;

const ChartSummary = styled.div`
  width: calc(50% + 8px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChartSummaryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 8px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;

  :hover {
    background: ${(props) => props.theme.form.select.optionHoverBackground};
  }
`;

const ChartSummaryItemLabel = styled.div``;

const ChartSummaryItemLabelPercentage = styled.div`
  color: ${(props) => props.theme.text_light};
`;

const ChartSummaryItemValue = styled.div``;

const EmptyContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0;
`

const EmptyItem = styled.div`
  display: flex;
  align-items: center;
  margin: 4% 0;
`

const EmptyItemLabel = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: ${props => props.theme.background};
`

const EmptyItemBar = styled.div`
  flex: 1;
  height: 2rem;
  background: ${props => props.theme.background};
  margin-left: 1rem;
`

const Expenses = () => {
  const {
    settings: { lang, currency },
    user: { transactions },
    categories: { expense },
    theme,
    text: { currentPage: text },
    ui: { filters },
  } = useSelector((state) => state);

  const [filter, setFilter] = useState("all");

  const [currentCategory, setCurrentCategory] = useState("all");
  const [expensesData, setExpensesData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [currentTotal, setCurrentTotal] = useState(0);

  const expensesMasterName = [];
  const expensesSubName = [];

  useEffect(() => {
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
    setExpensesData(formatData);
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

  if (!chartData) {
    return <div></div>;
  }

  if (_.isEmpty(chartData.datasets[0].data)) {
    setChartData({
      datasets: [
        {
          backgroundColor: [theme.background],
          data: [100],
          hoverBorderColor: theme.surface,
          hoverBackgroundColor: theme.background,
        },
      ],
      isEmpty: true,
    });
  }

  const options = {
    elements: {
      arc: {
        borderWidth: 4.5,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 80,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: chartData && !chartData.isEmpty ? true : false,
      callbacks: {
        title: function (tooltipItem, data) {
          return `${
            text[data.datasets[0].expensesMasterName[tooltipItem[0].index]]
          }`;
        },
        label: function (tooltipItem, data) {
          return `${data.labels[tooltipItem.index]}:    ${renderAmount(
            data.datasets[0].data[tooltipItem.index],
            lang,
            currency.symbol
          )}`;
        },
      },
    },
  };

  const renderEmpty = () => {
    const node = []
    for(let i = 0; i < 3; i++ ){
      node.push(
          <EmptyItem key={i}>
              <EmptyItemLabel />
              <EmptyItemBar />
          </EmptyItem>
    )}
    return (
      <EmptyContainer>
          {node}
      </EmptyContainer>
    )
  }


  return (
    <Container>
      <ExpensesTitle>
        Expenses
        {!chartData.isEmpty && (
          <SelectContainer>
            <Select
              input={{
                options: optionsA,
                isSearchable: false,
                customStyle: {
                  custom_control: {
                    height: "3.8rem",
                    borderRadius: "1rem",
                  },
                },
              }}
              currentValue={filter}
              onChange={filterHandler}
            />
          </SelectContainer>
        )}

      </ExpensesTitle>

      <ChartContainer>
        <ChartSummary>
          {chartData &&
            chartData.expenseLocale &&
            chartData.expenseLocale.slice(0, 3).map((d, index) => (
              <ChartSummaryItem key={index}>
                <ChartSummaryItemLabel>
                  <CategoryLabel
                    type="master"
                    item={{
                      master_name: d,
                    }}
                  >
                    <ChartSummaryItemLabelPercentage>
                      {Math.round(
                        (chartData.datasets[0].data[index] / currentTotal) * 100
                      )}
                      %
                    </ChartSummaryItemLabelPercentage>
                  </CategoryLabel>
                </ChartSummaryItemLabel>
                <ChartSummaryItemValue>
                  <Amount value={chartData.datasets[0].data[index]} />
                </ChartSummaryItemValue>
              </ChartSummaryItem>
            ))}
            {chartData.isEmpty && renderEmpty()}
        </ChartSummary>
        <Chart>
          <Doughnut data={chartData} options={options} />
          <Total>
            <Amount value={currentTotal} />
          </Total>
        </Chart>
      </ChartContainer>
    </Container>
  );
};

export default Expenses;
