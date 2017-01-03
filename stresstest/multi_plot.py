import os
import shutil
import sys

input_dir = sys.argv[1]
experiment_name = sys.argv[2]
output_dir = 'plots/chart' + experiment_name

if not os.path.isdir(output_dir):
  os.makedirs(output_dir)

shutil.copyfile('plots/chart.js', output_dir + '/chart.js')
shutil.copyfile('plots/chart.html', output_dir + '/chart.html')

with open(output_dir + '/data.json' , 'w') as joint_log:
  joint_log.write('[')
  for file in os.listdir(input_dir):
    with open (input_dir+ '/' + file) as log:
      for line in log:
        joint_log.write(line)
    joint_log.write(',')
  joint_log.seek(-1, os.SEEK_END)
  joint_log.truncate()
  joint_log.write(']')

os.system("open " +  output_dir + "/chart.html")
