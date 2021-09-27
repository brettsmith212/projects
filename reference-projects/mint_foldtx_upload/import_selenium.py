import selenium
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

path = '/Users/brettsmith/Desktop/Desktop Folder/Coding/Python/chromedriver'
driver = webdriver.Chrome(path)

################## SET UP CSV
csv = '../mint_csv_upload/fold_statement.csv'
csv_master = '../mint_csv_upload/fold_statement_master.csv'
df = pd.read_csv(csv)
df_master = pd.read_csv(csv_master)
df = df.dropna()
df_master = df_master.dropna()

df = pd.concat([df,df_master]).drop_duplicates(keep=False)
df_master = df_master.append(df)
df_master.to_csv(csv_master, index = False, mode='w+')

df = df.drop(columns='Transaction ID')

dates = pd.to_datetime(df["Date"], format = '%Y-%m-%d %H:%M')
dates = dates.apply(lambda x: x.strftime('%m/%d/%Y'))
date_list = dates.tolist()
date_list

description_list = df['Description'].tolist()
amount_list = df['Amount'].tolist()

########### OPEN MINT
if len(date_list) > 0:
    driver.get("https://mint.intuit.com/overview.event")
    print(driver.title)

    time.sleep(4)

    # test = driver.find_element_by_id("ius-link-account-recovery")
    # test.click()

    username = driver.find_element_by_id("ius-identifier")
    username.send_keys("username")
    username_button = driver.find_element_by_id("ius-sign-in-submit-btn")
    username_button.click()

    time.sleep(3)

    password = driver.find_element_by_id("ius-sign-in-mfa-password-collection-current-password")
    password.send_keys("password")
    password_button = driver.find_element_by_id("ius-sign-in-mfa-password-collection-continue-btn")
    password_button.click()

    time.sleep(5)

    transactions = driver.find_element_by_xpath("//a[@href='/transaction.event']")
    transactions.click()

    time.sleep(5)
    i = 0
    for i in range(len(date_list)):
        add_transaction = driver.find_element_by_id("controls-add")
        add_transaction.click()
        time.sleep(2)
        date = driver.find_element_by_id("txnEdit-date-input")
        date.send_keys(Keys.COMMAND, "a")
        time.sleep(1)
        date.send_keys("{}".format(date_list[i]))
        description = driver.find_element_by_id("txnEdit-merchant_input")
        description.send_keys("{}".format(description_list[i]) + " *bot")
        category = driver.find_element_by_id("txnEdit-category_input")
        category.send_keys("Shopping")
        amount = driver.find_element_by_id("txnEdit-amount_input")
        amount.send_keys("{}".format(amount_list[i]))
        submit_transaction = driver.find_element_by_id("txnEdit-submit")
        submit_transaction.click()
        time.sleep(2)
        print(date_list[i], " ", description_list[i], " ", amount_list[i])
    print("Finished adding {} transactions".format(len(date_list)))

else:
    print("Nothing to add -- End of Line")

"""
# INITIAL CODE
# add_transaction = driver.find_element_by_xpath("//a[@href='javascript://']")
add_transaction = driver.find_element_by_id("controls-add")
add_transaction.click()
time.sleep(2)
date = driver.find_element_by_id("txnEdit-date-input")
date.send_keys(Keys.COMMAND, "a")
time.sleep(1)
# date.send_keys("JUN 20")
date.send_keys("6/20/2021")
description = driver.find_element_by_id("txnEdit-merchant_input")
description.send_keys("TEST")
category = driver.find_element_by_id("txnEdit-category_input")
category.send_keys("Shopping")
amount = driver.find_element_by_id("txnEdit-amount_input")
amount.send_keys("0.01")
# time.sleep(5)
submit_transaction = driver.find_element_by_id("txnEdit-submit")
submit_transaction.click()
"""


# driver.quit()
